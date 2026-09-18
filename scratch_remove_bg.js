const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inputPath = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\f187809b-7bf2-4160-b847-5b50d54a3c5e\\.user_uploaded\\media_1789737692484.png';
const outputDir = path.join(__dirname, 'public/images');
const appDir = path.join(__dirname, 'src/app');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Dark background color matching: r < 40, g < 50, b < 60
        if (r < 40 && g < 50 && b < 60) {
          this.data[idx + 3] = 0; // Make background transparent
        }
      }
    }

    const outputPng = path.join(outputDir, 'logo-transparent.png');
    this.pack().pipe(fs.createWriteStream(outputPng)).on('finish', () => {
      console.log('✅ Transparent logo saved to:', outputPng);

      fs.copyFileSync(outputPng, path.join(outputDir, 'logo.png'));
      fs.copyFileSync(outputPng, path.join(appDir, 'favicon.ico'));
      fs.copyFileSync(outputPng, path.join(__dirname, 'public/favicon.ico'));
      console.log('✅ Logo & Favicon created successfully!');
    });
  });
