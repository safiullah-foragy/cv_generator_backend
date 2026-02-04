# Quick Start Guide

## Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

### Step 3: Test the API

#### Option A: Using PowerShell (Windows)
```powershell
.\test-api.ps1
```

#### Option B: Using cURL
```bash
curl -X POST http://localhost:5000/api/cv/generate \
  -F "name=John Doe" \
  -F "gmail=john@example.com" \
  -F "contactNumber=+1234567890" \
  -F "graduationSubject=Computer Science" \
  -F "graduationCGPA=3.75" \
  -F "skills=JavaScript, React, Node.js"
```

#### Option C: Using Postman
1. Open Postman
2. Create a POST request to `http://localhost:5000/api/cv/generate`
3. Select Body → form-data
4. Add your fields (see example-data.json for reference)
5. Click Send

## Expected Response

```json
{
  "success": true,
  "sessionId": "unique-session-id",
  "cvs": [
    {
      "templateId": 1,
      "templateName": "Professional Classic",
      "pdf": {
        "downloadUrl": "/api/cv/download/session-id/1/pdf"
      },
      "docx": {
        "downloadUrl": "/api/cv/download/session-id/1/docx"
      }
    }
    // ... 9 more templates
  ]
}
```

## Download Generated CVs

After generation, you can download CVs using the URLs from the response:

**PDF:**
```
http://localhost:5000/api/cv/download/{sessionId}/{templateId}/pdf
```

**DOCX:**
```
http://localhost:5000/api/cv/download/{sessionId}/{templateId}/docx
```

## Integration with React Frontend

1. Make sure your React app is running on a different port (e.g., 3000)
2. The backend has CORS enabled, so you can call it directly
3. Use the example code in README.md for integration

## Troubleshooting

**Port already in use?**
- Change the PORT in `.env` file

**Puppeteer installation issues?**
- Run: `npm install puppeteer --ignore-scripts`
- Then: `npm install`

**File upload not working?**
- Make sure Content-Type is `multipart/form-data`
- Check file size (max 5MB)

## Next Steps

1. ✅ Generate your first CV
2. ✅ Try different templates
3. ✅ Integrate with your frontend
4. ✅ Customize templates (edit services/pdfService.js)
5. ✅ Add more fields as needed

Happy CV Generating! 🎉
