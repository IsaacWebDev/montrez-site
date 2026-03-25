#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  console.log('Starting Vite build...');
  execSync('vite build', {
    stdio: 'inherit',
    env: process.env
  });
  console.log('Build successful!');
} catch (error) {
  console.error('BUILD FAILED!');
  console.error('Exit code:', error.status);
  console.error('Signal:', error.signal);
  console.error('Error output:', error.stderr?.toString());
  console.error('Full error:', error);
  process.exit(1);
}
