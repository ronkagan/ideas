const { spawn } = require('child_process');
const path = require('path');

if (!process.env.API_KEY) {
  console.log('Skipping integration test: API_KEY not set');
  process.exit(0);
}

const cli = path.resolve(__dirname, '..', 'index.js');
const proc = spawn('node', [cli, '--dry-run'], { stdio: 'inherit', env: process.env });
proc.on('exit', code => process.exit(code));
