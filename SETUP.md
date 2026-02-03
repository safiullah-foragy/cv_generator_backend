# Installation & Setup Instructions

## Prerequisites

- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)

## Installation Steps

### Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

### Step 2: Handle Puppeteer (Optional)

Puppeteer is used for PDF generation. If you encounter installation issues:

#### Option A: Skip Puppeteer (Use HTML output instead)
```powershell
$env:PUPPETEER_SKIP_DOWNLOAD='true'
npm install
```

The backend will generate HTML files that can be converted to PDF using:
- Browser's "Print to PDF" feature
- Online converters
- Other PDF tools

#### Option B: Install Puppeteer separately
```powershell
npm install puppeteer@latest
```

#### Option C: Use Chrome/Chromium already installed
Set the path in your code to use system Chrome:
```javascript
// In pdfService.js
executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
```

### Step 3: Verify Installation

Check if all packages are installed:
```powershell
npm list --depth=0
```

You should see:
- express
- cors
- docx
- uuid
- dotenv
- express-fileupload
- puppeteer (optional)

### Step 4: Start the Server

```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

You should see:
```
Server is running on port 5000
```

### Step 5: Test the API

#### Quick Test:
Open your browser and visit:
```
http://localhost:5000/health
```

You should see:
```json
{
  "status": "OK",
  "message": "CV Generator Backend is running"
}
```

#### Full Test:
Run the test script:
```powershell
.\test-api.ps1
```

## Common Issues & Solutions

### Issue 1: Port 5000 already in use

**Solution:** Change the port in `.env` file:
```
PORT=3001
```

### Issue 2: Puppeteer installation fails

**Error:** `Failed to download Chromium`

**Solutions:**
1. Skip Puppeteer installation (see Step 2, Option A)
2. Set a proxy if behind firewall:
   ```powershell
   $env:HTTPS_PROXY='http://proxy-server:port'
   npm install puppeteer
   ```
3. Use system Chrome (see Step 2, Option C)

### Issue 3: EPERM errors during npm install

**Solution:** Run PowerShell as Administrator:
1. Right-click PowerShell
2. Select "Run as Administrator"
3. Run `npm install` again

### Issue 4: express-fileupload not working

**Solution:** Already configured in server.js. Make sure you're sending `multipart/form-data`:
```javascript
// Correct:
const formData = new FormData();
formData.append('name', 'John Doe');

// Incorrect:
const data = { name: 'John Doe' }; // JSON won't work for file uploads
```

### Issue 5: CORS errors from frontend

**Solution:** CORS is already enabled. If issues persist, update in server.js:
```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

### Issue 6: Generated files not found

**Solution:** The directories are auto-created. If issues persist, manually create:
```powershell
mkdir uploads
mkdir generated_cvs
```

## Directory Structure After Installation

```
cv_generator_backend/
├── node_modules/          # Dependencies (auto-created)
├── uploads/               # User uploaded photos (auto-created)
├── generated_cvs/         # Generated CV files (auto-created)
│   └── {session-id}/     # Each session has its own folder
│       ├── cv_template_1.pdf
│       ├── cv_template_1.docx
│       └── ... (10 templates × 2 formats = 20 files)
├── controllers/
│   └── cvController.js
├── routes/
│   └── cvRoutes.js
├── services/
│   ├── pdfService.js
│   ├── docxService.js
│   ├── htmlService.js
│   └── templateService.js
├── .env
├── .gitignore
├── package.json
├── server.js
├── README.md
├── QUICKSTART.md
├── SETUP.md (this file)
├── example-data.json
├── test-api.ps1
└── test-api.sh
```

## Environment Variables

Edit `.env` file to configure:

```ini
# Server port
PORT=5000

# Environment (development/production)
NODE_ENV=development

# Upload directory for photos
UPLOAD_DIR=./uploads

# Output directory for generated CVs
OUTPUT_DIR=./generated_cvs

# Optional: Puppeteer executable path
# PUPPETEER_EXECUTABLE_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
```

## Testing with Different Tools

### Using PowerShell (Recommended for Windows)
```powershell
.\test-api.ps1
```

### Using cURL
```bash
curl -X POST http://localhost:5000/api/cv/generate \
  -F "name=John Doe" \
  -F "gmail=john@example.com" \
  -F "skills=JavaScript, React"
```

### Using Postman
1. Open Postman
2. Create new POST request
3. URL: `http://localhost:5000/api/cv/generate`
4. Body → form-data
5. Add fields from `example-data.json`
6. Send

### Using JavaScript/Fetch
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('gmail', 'john@example.com');
// ... add other fields

fetch('http://localhost:5000/api/cv/generate', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => console.log(data));
```

## Production Deployment

### 1. Environment Setup
- Set `NODE_ENV=production` in `.env`
- Use a process manager like PM2:
  ```bash
  npm install -g pm2
  pm2 start server.js --name cv-generator
  ```

### 2. Reverse Proxy (nginx)
```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### 3. SSL Certificate
Use Let's Encrypt for free SSL:
```bash
certbot --nginx -d your-domain.com
```

## Performance Optimization

### 1. Enable Compression
Already configured in production mode.

### 2. Cleanup Old Files
Add a cron job to delete old CVs:
```javascript
// cleanup.js
const fs = require('fs');
const path = require('path');

// Delete files older than 24 hours
const cleanupDir = 'generated_cvs';
// ... implementation
```

### 3. Rate Limiting
Install and configure:
```bash
npm install express-rate-limit
```

## Security Considerations

1. ✅ File upload validation (already configured)
2. ✅ File size limits (5MB max)
3. ✅ CORS enabled
4. ⚠️ Add rate limiting for production
5. ⚠️ Add authentication if needed
6. ⚠️ Validate and sanitize all inputs

## Next Steps

1. ✅ Complete installation
2. ✅ Test the API
3. ✅ Integrate with your frontend
4. ✅ Customize templates as needed
5. ✅ Deploy to production

## Support

If you encounter issues:
1. Check this document first
2. Review error logs in console
3. Check `npm-debug.log` if available
4. Ensure all dependencies are installed
5. Verify Node.js version: `node --version`

## Version Information

- Node.js: v14+ required
- Express: v4.18.2
- Puppeteer: v23.11.1 (optional)
- docx: v8.5.0

## License

ISC

---

Happy CV Generating! 🎉

For more information, see:
- [README.md](README.md) - Complete documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [example-data.json](example-data.json) - Sample data
