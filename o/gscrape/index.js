#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const Places = require('./lib/places');
const { exportJson } = require('./lib/exporters');

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option('config', { type: 'string', describe: 'Path to config yaml', default: 'config.example.yaml' })
    .option('dry-run', { type: 'boolean', describe: 'Do not write output, only show a sample', default: false })
    .help()
    .argv;

  const cfgPath = path.resolve(argv.config);
  if (!fs.existsSync(cfgPath)) {
    console.error('Config not found:', cfgPath);
    process.exit(1);
  }

  const cfg = yaml.load(fs.readFileSync(cfgPath, 'utf8'));
  const apiKey = process.env.API_KEY || process.env.PLACES_API_KEY;
  if (!apiKey) {
    console.error('Missing API key. Set API_KEY or PLACES_API_KEY environment variable.');
    process.exit(1);
  }

  const client = new Places(apiKey, cfg);
  const results = [];

  // Simple single-query search for demo purposes
  const q = cfg.query || 'coffee near me';
  console.log('Query:', q);

  try {
    const items = await client.textSearch(q, { bounds: cfg.bounds, maxResults: cfg.max_results || 20 });
    console.log('Found', items.length, 'results.');
    if (argv['dry-run']) {
      console.log('Sample result:', items[0]);
    } else {
      const outPath = cfg.output && cfg.output.path ? cfg.output.path : 'out.json';
      await exportJson(items, outPath);
      console.log('Wrote results to', outPath);
    }
  } catch (e) {
    console.error('Error during search:', e && e.message ? e.message : e);
    process.exit(1);
  }
}

main();
