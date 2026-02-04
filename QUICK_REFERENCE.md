# 🚀 Quick Reference Guide

Essential commands and information for the CV Generator project.

## 📦 Installation

```bash
# Windows
.\setup.ps1

# Linux/Mac
chmod +x setup.sh && ./setup.sh

# Manual
npm install
cd frontend && npm install
```

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
npm run dev
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### Production Mode

```bash
npm start
```

## 🌐 Important URLs

| Service | Local URL | Description |
|---------|-----------|-------------|
| Frontend | http://localhost:3000 | React application |
| Backend | http://localhost:5000 | Express API server |
| Health Check | http://localhost:5000/health | Server status |
| Generated Files | http://localhost:5000/generated/ | CV files |

## 📡 API Endpoints

### Generate CV
```http
POST /api/generate-cv
Content-Type: multipart/form-data

Returns: 10 CVs (PDF + DOCX)
```

### Download CV
```http
GET /api/download/:filename

Returns: File download
```

### Health Check
```http
GET /health

Returns: {"status":"OK","message":"CV Generator Backend is running"}
```

## 📁 Directory Structure

```
cv_generator_backend/
├── controllers/          # API logic
├── middleware/          # Upload handling
├── routes/             # API routes
├── services/           # PDF & DOCX generation
├── frontend/           # React app
├── uploads/            # Photo storage
├── generated/          # Generated CVs
└── server.js          # Main server
```

## 🔧 Configuration Files

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
```

### Frontend (.env in frontend/)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🎨 Available Templates

10 templates in both PDF and DOCX:
1. Professional Header
2. Modern Two-Column
3. Creative Sidebar
4. Minimalist
5. Elegant
6. Clean Modern
7. Minimal Sidebar
8. Timeline
9. Box Style
10. Classic

## 📝 Required Form Fields

- ✅ Name
- ✅ Email
- ✅ Phone
- ✅ Date of Birth
- ✅ Gender
- ✅ SSC GPA
- ✅ HSC GPA
- ✅ Graduation CGPA

## 📦 Key Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "pdfkit": "^0.13.0",
  "docx": "^8.5.0",
  "uuid": "^9.0.1",
  "dotenv": "^16.3.1"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "axios": "^1.6.0"
}
```

## 🚢 Deployment (Render.com)

### Quick Deploy
1. Push to GitHub
2. Render → New Blueprint
3. Connect repository
4. Deploy automatically

### Manual Deploy
**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
```
NODE_ENV=production
```

## 🔍 Debugging Commands

### Check server status
```bash
curl http://localhost:5000/health
```

### View backend logs
```bash
npm run dev
# Watch terminal output
```

### Check running processes
```bash
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

### Kill process on port
```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

## 🐛 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Port in use | Change PORT in .env |
| Can't connect | Check both servers running |
| Upload fails | Check file size (<5MB) |
| PDFs empty | Verify all required fields |
| Module not found | Run `npm install` |

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Main documentation |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Deploy instructions |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Complete overview |
| [TEST_DATA.md](TEST_DATA.md) | Sample test data |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Problem solutions |
| [CHECKLIST.md](CHECKLIST.md) | Setup verification |

## 🧪 Testing

### Sample cURL request
```bash
curl -X POST http://localhost:5000/api/generate-cv \
  -F "name=Test User" \
  -F "email=test@email.com" \
  -F "phone=1234567890" \
  -F "dateOfBirth=1990-01-01" \
  -F "age=34" \
  -F "gender=Male" \
  -F "sscGpa=5.00" \
  -F "hscGpa=5.00" \
  -F "graduationCgpa=3.50"
```

## 🔐 Security Notes

- ✅ File type validation (images only)
- ✅ File size limit (5MB)
- ✅ CORS enabled
- ✅ Environment variables
- ⚠️ .env not committed to Git

## 📊 Performance Tips

- Generate CVs asynchronously
- Clean old files periodically
- Use cloud storage for production
- Implement caching if needed
- Monitor memory usage

## 🎯 Quick Workflow

1. **Start Development:**
   ```bash
   npm run dev          # Terminal 1
   cd frontend && npm start  # Terminal 2
   ```

2. **Make Changes:**
   - Edit files
   - Save
   - Auto-reload

3. **Test:**
   - Fill form
   - Generate CVs
   - Check downloads

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```

## 🔄 Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all
npm update

# Update specific package
npm install package-name@latest
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px)

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px)

/* Desktop */
@media (min-width: 1025px)
```

## 🎨 Color Schemes

Templates use 10 different color palettes:
- Template 1: #2C3E50 / #3498DB (Professional Blue)
- Template 2: #27AE60 / #2ECC71 (Modern Green)
- Template 3: #8E44AD / #9B59B6 (Creative Purple)
- Template 4: #E74C3C / #C0392B (Bold Red)
- Template 5: #F39C12 / #F1C40F (Elegant Gold)
- Template 6: #1ABC9C / #16A085 (Clean Teal)
- Template 7: #34495E / #95A5A6 (Minimal Gray)
- Template 8: #E67E22 / #D35400 (Warm Orange)
- Template 9: #16A085 / #1ABC9C (Fresh Turquoise)
- Template 10: #2980B9 / #3498DB (Classic Blue)

## ⚡ Keyboard Shortcuts (VS Code)

| Shortcut | Action |
|----------|--------|
| Ctrl + ` | Open terminal |
| Ctrl + B | Toggle sidebar |
| Ctrl + P | Quick file open |
| Ctrl + Shift + F | Search in files |
| F5 | Start debugging |

## 🎓 Learning Resources

- Express: https://expressjs.com/
- React: https://react.dev/
- PDFKit: https://pdfkit.org/
- docx: https://docx.js.org/

## 📞 Support

For issues:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Search error message online
3. Check GitHub issues
4. Create new issue with details

## ✅ Pre-Deploy Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] .env not committed
- [ ] Dependencies updated
- [ ] Code committed to Git
- [ ] README updated

## 🎉 Success Indicators

✅ Backend health check returns OK
✅ Frontend loads without errors
✅ Form submission works
✅ 10 CVs generate successfully
✅ Downloads work in both formats
✅ Deployed app is accessible

---

**Quick Help:** Use Ctrl+F to search this document for specific topics.

**Pro Tip:** Bookmark this file for quick reference during development!
