# gscrape (example scaffold)

Minimal scaffold demonstrating Places API usage. This is a starting point — extend with exporters, retries, and tests.

Usage
- Set the API key in environment: `export API_KEY=your_key_here`
- Run a dry-run: `npm run dry-run`
- Run a real job: `npm start -- --config config.example.yaml`

Notes
- Do not check API keys into source control. Use environment variables or secret stores.
- The textSearch implementation uses the Places Text Search endpoint and paginates using next_page_token.
# gscrape

Lightweight project for collecting structured place information from Google Maps results for research and analysis.

## Features
- Export place listings to JSON/CSV
- Configurable search queries, bounds, and filters
- Pluggable exporters and simple data schema
- Rate-limit and retry configuration (do not use to evade restrictions)

## Prerequisites
- Node.js >= 16 (or Python 3.10+, depending on implementation)
- (Recommended) Google Maps Platform API key for legitimate use
- Internet access

## Installation
1. Clone the repo
2. Install dependencies
    - Node: `npm install`
    - Python: `pip install -r requirements.txt`

## Configuration
Provide configuration via a YAML or JSON file (example: config.yaml):
- query: search term or place type
- bounds: optional geographic bounding box
- max_results: limit per query
- rate_limit: requests per minute
- output: path and format (json or csv)
- api_key: use if calling Google Maps APIs

Do not store API keys in source control. Use environment variables for secrets.

## Usage
- With official APIs (recommended):
  - Set `API_KEY` environment variable
  - Run: `npm start -- --config config.yaml` (or equivalent)
- If a web-scraping mode exists, use it only for permitted datasets, obey robots.txt and throttle requests:
  - `npm run scrape -- --config config.yaml`

Example output (JSON):
{
  "name": "Example Cafe",
  "address": "123 Main St, Anytown",
  "place_id": "ChIJ...",
  "latitude": 12.3456,
  "longitude": -65.4321,
  "phone": "+1-555-1234",
  "rating": 4.5,
  "reviews_count": 128,
  "source": "google_maps"
}

## Output
- Supports JSON and CSV
- Normalized fields: name, address, place_id, lat, lng, phone, website, rating, reviews_count, hours, raw_html (optional)

## Testing
- Unit tests: `npm test` or `pytest`
- Dry-run mode to validate configuration without issuing network requests

## Contributing
- Open issues and PRs
- Follow repository coding standards and include tests for new behavior

## License
MIT — see LICENSE file
