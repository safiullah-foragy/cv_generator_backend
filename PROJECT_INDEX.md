# 📋 CV Generator Backend - Project Index

## 📁 Project Structure

```
cv_generator_backend/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── .env                      # Environment variables
│   └── .gitignore               # Git ignore rules
│
├── 📚 Documentation
│   ├── README.md                # Complete documentation
│   ├── QUICKSTART.md            # Quick start guide
│   ├── SETUP.md                 # Installation instructions
│   ├── FEATURES.md              # Feature list
│   └── PROJECT_INDEX.md         # This file
│
├── 🧪 Testing & Examples
│   ├── test-api.ps1             # PowerShell test script
│   ├── test-api.sh              # Bash test script
│   └── example-data.json        # Sample CV data
│
├── 🚀 Application Core
│   ├── server.js                # Express server entry point
│   │
│   ├── 🛣️ routes/
│   │   └── cvRoutes.js          # API route definitions
│   │
│   ├── 🎮 controllers/
│   │   └── cvController.js      # Request handlers
│   │
│   └── ⚙️ services/
│       ├── templateService.js   # Template definitions (10 templates)
│       ├── pdfService.js        # PDF generation with Puppeteer
│       ├── docxService.js       # DOCX generation
│       └── htmlService.js       # HTML generation (fallback)
│
└── 📦 Generated Content (auto-created)
    ├── uploads/                 # User uploaded photos
    └── generated_cvs/          # Generated CV files
        └── {session-id}/       # Session-specific folder
            ├── cv_template_1.pdf
            ├── cv_template_1.docx
            ├── cv_template_2.pdf
            ├── cv_template_2.docx
            └── ... (20 files per session)
```

## 📖 Documentation Guide

### For First-Time Users
1. **Start Here:** [QUICKSTART.md](QUICKSTART.md)
   - 3-step setup
   - Immediate testing
   - Basic usage

### For Complete Setup
2. **Then Read:** [SETUP.md](SETUP.md)
   - Detailed installation
   - Troubleshooting
   - Production deployment
   - Security configuration

### For Full Understanding
3. **Then Review:** [README.md](README.md)
   - API documentation
   - Integration examples
   - Complete feature list
   - Frontend integration code

### For Feature Reference
4. **Finally Check:** [FEATURES.md](FEATURES.md)
   - All features listed
   - Technical specifications
   - Use cases
   - Customization options

## 🎯 Quick Reference

### Installation
```bash
npm install
npm start
```

### API Endpoint
```
POST http://localhost:5000/api/cv/generate
```

### Test
```powershell
.\test-api.ps1
```

### Health Check
```
GET http://localhost:5000/health
```

## 📝 File Descriptions

### Configuration Files

| File | Purpose | Edit? |
|------|---------|-------|
| `.env` | Environment variables (port, paths) | ✅ Yes |
| `package.json` | NPM dependencies and scripts | ⚠️ Careful |
| `.gitignore` | Files to exclude from git | ✅ Yes |

### Documentation Files

| File | Content | Audience |
|------|---------|----------|
| `README.md` | Complete documentation | All users |
| `QUICKSTART.md` | Quick start guide | New users |
| `SETUP.md` | Installation & troubleshooting | Developers |
| `FEATURES.md` | Feature list & specs | Product team |
| `PROJECT_INDEX.md` | This navigation guide | All users |

### Testing Files

| File | Purpose | Platform |
|------|---------|----------|
| `test-api.ps1` | API test script | Windows PowerShell |
| `test-api.sh` | API test script | Linux/Mac Bash |
| `example-data.json` | Sample CV data | Reference |

### Core Application Files

| File | Role | Modify? |
|------|------|---------|
| `server.js` | Express app & server | ⚠️ Careful |
| `routes/cvRoutes.js` | API routes | ✅ Add routes |
| `controllers/cvController.js` | Request handlers | ✅ Add logic |
| `services/templateService.js` | Template definitions | ✅ Add templates |
| `services/pdfService.js` | PDF generation | ✅ Customize |
| `services/docxService.js` | DOCX generation | ✅ Customize |
| `services/htmlService.js` | HTML fallback | ✅ Customize |

## 🎨 10 CV Templates

1. **Professional Classic** - Corporate, traditional
2. **Modern Blue** - Tech-focused, contemporary
3. **Executive Elite** - Senior leadership
4. **Creative Bold** - Creative professionals
5. **Minimalist Green** - Eco-friendly, clean
6. **Corporate Gray** - Business professional
7. **Tech Orange** - Startups, tech companies
8. **Academic Formal** - Academic positions
9. **Elegant Purple** - Standout applications
10. **Fresh Teal** - Modern professional

## 🔧 Key Dependencies

```json
{
  "express": "Web framework",
  "cors": "Cross-origin support",
  "puppeteer": "PDF generation",
  "docx": "DOCX generation",
  "express-fileupload": "File uploads",
  "uuid": "Session IDs",
  "dotenv": "Environment config"
}
```

## 🌐 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/cv/generate` | Generate all CVs |
| GET | `/api/cv/:sessionId/:templateId/:format` | View CV |
| GET | `/api/cv/download/:sessionId/:templateId/:format` | Download CV |
| GET | `/api/cv/session/:sessionId` | List session CVs |
| GET | `/health` | Health check |

## 📊 Data Schema

### Required Fields
- `name` - Full name
- `gmail` - Email address
- `contactNumber` - Phone number

### Education Fields
- `sscGPA`, `sscSchool`, `sscBoard`
- `hscGPA`, `hscCollege`, `hscBoard`
- `graduationSubject`, `graduationCGPA`, `graduationInstitution`

### Optional Fields
- `fathersName`, `mothersName`
- `presentAddress`, `permanentAddress`
- `dateOfBirth`, `age`, `gender`, `maritalStatus`
- `nationality`, `languages`, `hobbies`
- `skills`, `currentJob`, `previousJobs[]`
- `photo` (file upload)

## 🚀 Usage Flow

```
1. Frontend Form
   ↓
2. Submit to /api/cv/generate
   ↓
3. Backend processes:
   - Save photo
   - Generate 10 PDFs
   - Generate 10 DOCX files
   ↓
4. Return response with:
   - Session ID
   - 20 download URLs
   ↓
5. Frontend displays:
   - Template previews
   - Download buttons
   - View options
```

## 🔐 Security Features

- ✅ File size limits (5MB)
- ✅ File type validation
- ✅ Path sanitization
- ✅ CORS enabled
- ✅ Error handling
- ✅ Input validation

## 📱 Integration Examples

### React
```javascript
const response = await axios.post(
  'http://localhost:5000/api/cv/generate',
  formData
);
```

### Vanilla JS
```javascript
fetch('http://localhost:5000/api/cv/generate', {
  method: 'POST',
  body: formData
});
```

### cURL
```bash
curl -X POST http://localhost:5000/api/cv/generate \
  -F "name=John Doe" \
  -F "gmail=john@example.com"
```

## 🎓 Learning Path

1. **Day 1:** Install and run ([QUICKSTART.md](QUICKSTART.md))
2. **Day 2:** Understand API ([README.md](README.md))
3. **Day 3:** Customize templates ([services/pdfService.js](services/pdfService.js))
4. **Day 4:** Integrate frontend (examples in [README.md](README.md))
5. **Day 5:** Deploy to production ([SETUP.md](SETUP.md))

## 🛠️ Customization Points

### Easy (No coding needed)
- Change colors in `templateService.js`
- Modify template names/descriptions
- Adjust environment variables

### Medium (Basic coding)
- Add new fields to forms
- Modify HTML layouts
- Add new API endpoints

### Advanced (Full development)
- Create new templates
- Add authentication
- Implement caching
- Add email delivery

## 📞 Getting Help

### Check These First:
1. Error in console? → Check error message
2. Installation issue? → See [SETUP.md](SETUP.md)
3. API not working? → Run test script
4. Need examples? → See [example-data.json](example-data.json)

### Common Commands:
```bash
# Check Node version
node --version

# Check dependencies
npm list --depth=0

# Clean install
rm -rf node_modules package-lock.json
npm install

# Start server
npm start

# Test API
.\test-api.ps1
```

## 📈 Performance Tips

1. Use session cleanup (delete old files)
2. Implement caching for templates
3. Add rate limiting
4. Use PM2 for production
5. Enable gzip compression

## 🎉 What You Get

- ✅ 10 Professional CV templates
- ✅ PDF and DOCX export
- ✅ RESTful API
- ✅ File upload support
- ✅ Complete documentation
- ✅ Test scripts
- ✅ Example data
- ✅ Production-ready code

## 📊 Project Stats

- **Total Files:** 17 core files
- **Templates:** 10 unique designs
- **Output Formats:** 2 (PDF, DOCX)
- **API Endpoints:** 5
- **Documentation:** 4 comprehensive guides
- **Dependencies:** 7 main packages
- **Lines of Code:** ~4,000+

## 🌟 Next Steps

1. ✅ Read [QUICKSTART.md](QUICKSTART.md)
2. ✅ Install dependencies
3. ✅ Test the API
4. ✅ Review [README.md](README.md)
5. ✅ Integrate with frontend
6. ✅ Customize as needed
7. ✅ Deploy to production

---

## 📚 Complete File List

### Root Level
- `.env` - Environment configuration
- `.gitignore` - Git exclusions
- `package.json` - NPM configuration
- `server.js` - Application entry point

### Documentation (/)
- `README.md` - Main documentation
- `QUICKSTART.md` - Quick start
- `SETUP.md` - Setup guide
- `FEATURES.md` - Feature list
- `PROJECT_INDEX.md` - This file

### Testing (/)
- `test-api.ps1` - PowerShell test
- `test-api.sh` - Bash test
- `example-data.json` - Sample data

### Routes (/routes)
- `cvRoutes.js` - API routes

### Controllers (/controllers)
- `cvController.js` - Request handlers

### Services (/services)
- `templateService.js` - Templates
- `pdfService.js` - PDF generator
- `docxService.js` - DOCX generator
- `htmlService.js` - HTML generator

---

**Welcome to the CV Generator Backend!** 🎨📄✨

Start with [QUICKSTART.md](QUICKSTART.md) and you'll be generating CVs in minutes!
