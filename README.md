# 📄 Professional CV Generator

A full-stack web application that generates professional CVs in **20 different templates** with both PDF and DOCX download options. Built with Node.js, Express, React, and modern web technologies.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## ✨ Features

- 📝 **20 Professional Templates** - Unique designs with different colors, fonts, and styles
- 📥 **Dual Format Export** - Download as PDF or DOCX
- 📸 **Photo Integration** - All templates include your uploaded profile photo
- 🎓 **Complete Education History** - SSC, HSC, and Graduation details
- 💼 **Work Experience Tracking** - Current and previous jobs
- 🛠️ **Skills & Languages** - Showcase your abilities
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Ready for Deployment** - Configured for Render.com

## 🚀 Quick Start

### Automatic Setup (Recommended)

**Windows:**
```powershell
.\setup.ps1
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup

**Backend:**
```bash
npm install
npm run dev
```

**Frontend** (in new terminal):
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📋 What You Can Do

1. **Fill out the comprehensive form** with your personal and professional details
2. **Upload a photo** (required for best results - included in all templates)
3. **Generate 20 different CVs** instantly with unique designs
4. **Preview each template** before downloading
5. **Download in your preferred format** (PDF or DOCX)
6. **Create multiple CVs** with different data

## 🎨 Available Templates

1. **Professional** - Clean header design with structured sections
2. **Modern Two-Column** - Contemporary layout with sidebar
3. **Creative Sidebar** - Eye-catching colored sidebar
4. **Minimalist** - Simple and elegant centered design
5. **Elegant Professional** - Sophisticated business style
6. **Clean Modern** - Fresh and contemporary
7. **Minimal Sidebar** - Understated sidebar design
8. **Timeline Style** - Progressive layout
9. **Box Style** - Structured container design
10. **Classic** - Traditional formal format

Each template is available in both PDF and DOCX formats!

## 📁 Project Structure

```
cv_generator_backend/
├── controllers/          # Request handlers
├── middleware/          # Multer upload config
├── routes/             # API routes
├── services/           # PDF & DOCX generation
├── frontend/           # React application
│   └── src/
│       ├── components/ # Form & Results
│       └── App.js     # Main component
├── uploads/            # Photo storage
├── generated/          # Generated CVs
└── server.js          # Express server
```

## 🌐 API Documentation

### Generate CVs
```
POST /api/generate-cv
Content-Type: multipart/form-data
```

**Request Body:**
- All personal information fields
- Education details (SSC, HSC, Graduation)
- Work experience
- Skills, languages, hobbies
- Photo (optional file upload)

**Response:**
```json
{
  "success": true,
  "message": "CVs generated successfully",
  "data": [
    {
      "templateId": 1,
      "templateName": "Template 1",
      "pdf": {
        "filename": "cv_template_1_xxx.pdf",
        "downloadUrl": "/api/download/cv_template_1_xxx.pdf"
      },
      "docx": {
        "filename": "cv_template_1_xxx.docx",
        "downloadUrl": "/api/download/cv_template_1_xxx.docx"
      }
    }
    // ... 9 more templates
  ]
}
```

### Download CV
```
GET /api/download/:filename
```

### Health Check
```
GET /health
```

## 🚢 Deployment to Render.com

### Option 1: Using Blueprint (Easiest)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. In Render Dashboard:
   - Click "New +" → "Blueprint"
   - Connect repository
   - Render will use `render.yaml` automatically

### Option 2: Manual Setup

See detailed instructions in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📦 Technologies Used

### Backend
- **Express.js** - Web framework
- **Multer** - File upload handling
- **PDFKit** - PDF generation
- **docx** - DOCX generation
- **UUID** - Unique file naming
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **CSS3** - Custom styling

## 🔒 Security Features

- ✅ File type validation (images only)
- ✅ File size limits (5MB maximum)
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variable protection

## 📚 Documentation

- [📖 Deployment Guide](DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [📊 Project Summary](PROJECT_SUMMARY.md) - Complete project overview
- [🧪 Test Data](TEST_DATA.md) - Sample data for testing

## 🧪 Testing

Use the sample data provided in [TEST_DATA.md](TEST_DATA.md) to test the application.

**Quick test:**
1. Start both backend and frontend
2. Open http://localhost:3000
3. Fill the form with test data
4. Click "Generate CVs"
5. View and download your CVs!

## 🛠️ Development

### Requirements
- Node.js >= 18.0.0
- npm or yarn

### Environment Variables

**Backend (.env):**
```
PORT=5000
NODE_ENV=development
```

**Frontend (frontend/.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

### Scripts

**Backend:**
```bash
npm start       # Production
npm run dev     # Development with nodemon
```

**Frontend:**
```bash
npm start       # Development server
npm run build   # Production build
```

## 🐛 Troubleshooting

**Port already in use:**
- Change PORT in `.env` file

**Frontend can't connect:**
- Ensure backend is running on port 5000
- Check `proxy` in frontend/package.json

**File upload fails:**
- Check file size (max 5MB)
- Verify file type (JPEG, JPG, PNG only)

**CVs not generating:**
- Check console for errors
- Ensure all required fields are filled
- Verify `generated/` directory exists

## 🔮 Future Enhancements

- [ ] Cloud storage (AWS S3, Cloudinary)
- [ ] User authentication
- [ ] CV history and management
- [ ] Photo editing tools
- [ ] Live preview
- [ ] Email delivery
- [ ] More templates (target: 20+)
- [ ] Cover letter generation
- [ ] ATS optimization
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new CV templates
- Improve existing designs
- Fix bugs
- Enhance documentation

## 📄 License

ISC License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Created with ❤️ for helping people create professional CVs easily.

## 🌟 Acknowledgments

- PDFKit for excellent PDF generation
- docx library for DOCX creation
- React team for amazing framework
- All open-source contributors

---

**Ready to create your professional CV?** Get started now!

For questions or issues, please check the documentation files or create an issue.
