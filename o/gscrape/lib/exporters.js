const fs = require('fs').promises;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function exportJson(items, outPath) {
  await fs.writeFile(outPath, JSON.stringify(items, null, 2), 'utf8');
}

async function exportCsv(items, outPath) {
  if (!items || items.length === 0) {
    await fs.writeFile(outPath, '', 'utf8');
    return;
  }
  const headers = Object.keys(items[0]).filter(k => k !== 'raw').map(k => ({id:k, title:k}));
  const csvWriter = createCsvWriter({ path: outPath, header: headers });
  await csvWriter.writeRecords(items.map(it => {
    const copy = { ...it };
    delete copy.raw; // raw can be large
    return copy;
  }));
}

module.exports = { exportJson, exportCsv };
