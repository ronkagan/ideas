const axios = require('axios');
const Bottleneck = require('bottleneck');
const pRetry = require('p-retry');

class Places {
  constructor(apiKey, config = {}) {
    this.apiKey = apiKey;
    this.config = config;
    // rate limiter - default to 10 reqs/sec unless configured
    this.limiter = new Bottleneck({ minTime: config.rate_limit ? Math.ceil(60000 / config.rate_limit) : 100 });
    this.base = 'https://maps.googleapis.com/maps/api/place';
  }

  async textSearch(query, { bounds, maxResults = 20 } = {}) {
    const pageSize = 20; // Google returns up to 20 results per page
    let results = [];
    let nextPageToken = null;

    do {
      const params = new URLSearchParams();
      params.append('query', query);
      params.append('key', this.apiKey);
      if (bounds) params.append('location', `${bounds.lat},${bounds.lng}`);
      if (nextPageToken) params.append('pagetoken', nextPageToken);

      const url = `${this.base}/textsearch/json?${params.toString()}`;

      const doRequest = async () => {
        if (this.options && this.options.incrementApiCall) {
          await this.options.incrementApiCall();
        }
        const r = await axios.get(url);
        if (r.status >= 500) throw new Error('Server error');
        return r;
      };
      const resp = await pRetry(() => this.limiter.schedule(doRequest), { retries: 3, factor: 2 });
      if (resp.data && resp.data.results) {
        // optionally fetch details for each place
        const normalized = await Promise.all(resp.data.results.map(async (r, idx) => {
          const base = this.normalize(r);
          if (this.config.request_details === false || !r.place_id) return base;

          const detailsTopN = (this.options && this.options.detailsTopN) || this.config.details_top_n || null;
          if (detailsTopN !== null && idx >= detailsTopN) return base;

          // check cache first
          if (this.options && this.options.storage && this.options.storage.getDetails) {
            const cached = await this.options.storage.getDetails(r.place_id);
            if (cached) {
              return { ...base, phone: cached.formatted_phone_number, international_phone: cached.international_phone_number, website: cached.website, details_raw: cached };
            }
          }

          try {
            const details = await this.getDetails(r.place_id);
            // store to cache if storage available
            if (this.options && this.options.storage && this.options.storage.storeDetails) {
              await this.options.storage.storeDetails(r.place_id, details);
            }
            return { ...base, phone: details.formatted_phone_number, international_phone: details.international_phone_number, website: details.website, details_raw: details };
          } catch (e) {
            return base;
          }
        }));
        results = results.concat(normalized);
      }
      nextPageToken = resp.data.next_page_token;
      // Google requires a short delay before using next_page_token
      if (nextPageToken) await new Promise(res => setTimeout(res, 2000));
  } while (nextPageToken && results.length < maxResults);

    return results.slice(0, maxResults);
  }

  normalize(r) {
    return {
      name: r.name,
      address: r.formatted_address,
      place_id: r.place_id,
      latitude: r.geometry && r.geometry.location && r.geometry.location.lat,
      longitude: r.geometry && r.geometry.location && r.geometry.location.lng,
      rating: r.rating,
      reviews_count: r.user_ratings_total,
      types: r.types,
      raw: r
    };
  }

  async getDetails(placeId) {
    const params = new URLSearchParams();
    params.append('place_id', placeId);
    params.append('key', this.apiKey);
    const url = `${this.base}/details/json?${params.toString()}`;
    const doRequest = async () => {
      if (this.options && this.options.incrementApiCall) {
        await this.options.incrementApiCall();
      }
      const r = await require('axios').get(url);
      if (r.status >= 500) throw new Error('Server error');
      return r;
    };
    const resp = await pRetry(() => this.limiter.schedule(doRequest), { retries: 3, factor: 2 });
    if (resp.data && resp.data.result) return resp.data.result;
    throw new Error('No details returned');
  }
}

module.exports = Places;
