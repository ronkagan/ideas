const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

class Storage {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = null;
  }

  async init() {
    this.db = await open({ filename: this.dbPath, driver: sqlite3.Database });
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS queries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        query TEXT NOT NULL,
        result_count INTEGER,
        ran_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        value INTEGER
      );
      CREATE TABLE IF NOT EXISTS details_cache (
        place_id TEXT PRIMARY KEY,
        details_json TEXT,
        cached_at TEXT DEFAULT (datetime('now'))
      );
    `);
    // ensure api_calls metric exists
    const row = await this.db.get(`SELECT value FROM metrics WHERE name = 'api_calls'`);
    if (!row) {
      await this.db.run(`INSERT INTO metrics (name, value) VALUES ('api_calls', 0)`);
    }
  }

  async recordQuery(query, resultCount) {
    await this.db.run(`INSERT INTO queries (query, result_count) VALUES (?, ?)`,[query, resultCount]);
  }

  async incrementApiCalls(by = 1) {
    await this.db.run(`UPDATE metrics SET value = value + ? WHERE name = 'api_calls'`, [by]);
  }

  async getApiCalls() {
    const row = await this.db.get(`SELECT value FROM metrics WHERE name = 'api_calls'`);
    return row ? row.value : 0;
  }

  async getDetails(placeId) {
    const row = await this.db.get(`SELECT details_json FROM details_cache WHERE place_id = ?`, [placeId]);
    return row ? JSON.parse(row.details_json) : null;
  }

  async storeDetails(placeId, details) {
    const json = JSON.stringify(details);
    await this.db.run(`INSERT OR REPLACE INTO details_cache (place_id, details_json, cached_at) VALUES (?, ?, datetime('now'))`, [placeId, json]);
  }
}

module.exports = Storage;
