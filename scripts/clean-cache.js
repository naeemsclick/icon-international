const fs = require('fs');
const path = require('path');

const cacheDir = path.join(process.cwd(), '.next', 'cache');

if (fs.existsSync(cacheDir)) {
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('✅ Successfully purged .next/cache directory');
  } catch (err) {
    console.error('⚠️ Warning: Could not purge .next/cache:', err.message);
  }
} else {
  console.log('ℹ️ No .next/cache directory found.');
}
