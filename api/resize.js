const sharp = require('sharp');
const busboy = require('busboy');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bb = busboy({ headers: req.headers });
    let fileBuffer = null;
    let size = null;

    return new Promise((resolve) => {
      bb.on('file', async (fieldname, file, info) => {
        const chunks = [];
        
        file.on('data', (chunk) => {
          chunks.push(chunk);
        });

        file.on('end', () => {
          fileBuffer = Buffer.concat(chunks);
        });
      });

      bb.on('field', (fieldname, value) => {
        if (fieldname === 'size') {
          size = parseInt(value, 10);
        }
      });

      bb.on('close', async () => {
        try {
          if (!fileBuffer) {
            res.status(400).json({ error: 'No file uploaded' });
            return resolve();
          }

          if (!size || size < 1 || size > 5000) {
            res.status(400).json({ error: 'Invalid size parameter' });
            return resolve();
          }

          // Resize the image using sharp
          const resized = await sharp(fileBuffer)
            .resize(size, size, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .png()
            .toBuffer();

          res.setHeader('Content-Type', 'image/png');
          res.setHeader(
            'Content-Disposition',
            'attachment; filename="resized-image.png"'
          );
          res.status(200).send(resized);
          resolve();
        } catch (error) {
          console.error('Error processing image:', error);
          res.status(500).json({ error: 'Failed to process image' });
          resolve();
        }
      });

      req.pipe(bb);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
