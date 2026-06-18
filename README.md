# PNG Resizer 🖼️

A simple web app that lets anyone upload a PNG image and resize it to a specific pixel size.

## Features

- 📤 Drag-and-drop file upload
- 🔧 Resize PNG images to any pixel size (1-5000px)
- 👁️ Live preview of original and resized images
- ⬇️ Download resized image instantly
- 🎨 Beautiful, responsive UI
- ⚡ Fast serverless processing

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express + Sharp (image processing library)
- **Deployment**: Vercel (serverless functions)

## Local Development

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd png-resizer
```

2. Install dependencies:
```bash
npm install
```

3. Install Vercel CLI (for local development):
```bash
npm install -g vercel
```

4. Run locally:
```bash
vercel dev
```

The app will be available at `http://localhost:3000`

## Deployment to Vercel

### Option 1: Connect GitHub (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration
6. Click "Deploy" — that's it! 🎉

### Option 2: Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## How to Use

1. Enter the target pixel size (width/height)
2. Upload a PNG file (drag-and-drop or click to browse)
3. Click "Resize Image"
4. Preview the original and resized versions
5. Click "Download Resized Image" to save

## API Endpoint

**POST** `/api/resize`

### Request
- `file`: PNG image file (multipart/form-data)
- `size`: Target pixel size (1-5000)

### Response
- Returns the resized PNG image as a blob

### Example using curl:
```bash
curl -F "file=@image.png" -F "size=800" http://localhost:3000/api/resize > resized.png
```

## Configuration

### Image Resizing Options

The resizing uses Sharp's `fit: 'inside'` mode with these properties:
- Maintains aspect ratio
- Won't enlarge images smaller than target size
- Max size: 5000px to prevent abuse

To modify, edit `api/resize.js`:
```javascript
.resize(size, size, {
  fit: 'inside',
  withoutEnlargement: true,
})
```

## File Structure

```
png-resizer/
├── public/
│   └── index.html          # Frontend UI
├── api/
│   └── resize.js           # Resize API endpoint
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
├── README.md              # This file
└── .gitignore
```

## Limitations & Future Features

### Current Limitations
- PNG files only
- 5000px maximum size limit
- File size limited by Vercel (100MB)

### Potential Features to Add
- 📊 Support for JPEG, WebP formats
- 🔄 Batch resize multiple images
- 📐 Custom width/height (not square)
- 💾 Save resize presets
- 🌙 Dark mode
- 📈 Image compression options

## Troubleshooting

### "Cannot find module 'sharp'"
```bash
npm install
```

### Build fails on Vercel
Make sure `node_modules` is in `.gitignore` (it should be) and you have all dependencies listed in `package.json`

### Image not processing
- Ensure file is actually a PNG
- Check that size value is between 1-5000
- Check browser console for detailed error messages

## License

MIT

## Support

Found a bug or want to suggest a feature? Open an issue on GitHub!

---

**Happy resizing!** 🎉
