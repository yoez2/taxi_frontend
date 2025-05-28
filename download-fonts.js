const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  {
    name: 'Poppins',
    weights: ['Regular', 'Medium', 'SemiBold', 'Bold'],
    url: 'https://fonts.gstatic.com/s/poppins/v20/'
  },
  {
    name: 'Bangers',
    weights: ['Regular'],
    url: 'https://fonts.gstatic.com/s/bangers/v20/'
  },
  {
    name: 'GreatVibes',
    weights: ['Regular'],
    url: 'https://fonts.gstatic.com/s/greatvibes/v18/'
  },
  {
    name: 'Lugrasimo',
    weights: ['Regular'],
    url: 'https://fonts.gstatic.com/s/lugrasimo/v1/'
  },
  {
    name: 'Platypi',
    weights: ['Regular', 'Medium', 'SemiBold'],
    url: 'https://fonts.gstatic.com/s/platypi/v1/'
  }
];

const fontDir = path.join(__dirname, 'src', 'assets', 'fonts');

if (!fs.existsSync(fontDir)) {
  fs.mkdirSync(fontDir, { recursive: true });
}

fonts.forEach(font => {
  font.weights.forEach(weight => {
    const fileName = `${font.name}-${weight}.woff2`;
    const filePath = path.join(fontDir, fileName);
    const url = `${font.url}${fileName}`;

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${fileName}`);
        });
      } else {
        console.error(`Failed to download ${fileName}: ${response.statusCode}`);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${fileName}: ${err.message}`);
    });
  });
}); 