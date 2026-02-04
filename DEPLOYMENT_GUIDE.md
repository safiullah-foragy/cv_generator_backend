# CV Generator - Complete Deployment Guide

## 📦 Project Structure

```
cv_generator_backend/
├── backend files (server.js, routes, controllers, services, middleware)
├── frontend/ (React application)
├── package.json (backend dependencies)
├── .env
├── render.yaml (Render.com configuration)
└── README.md
```

## 🚀 Quick Start (Local Development)

### Backend Setup

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Create necessary directories:**
   The server will automatically create `uploads/` and `generated/` directories.

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 🌐 Deployment to Render.com

### Method 1: Using render.yaml (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Render.com:**
   - Go to [Render.com](https://render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and configure services

3. **Configure Environment Variables:**
   Render will use the values from `render.yaml`, but you can override them in the dashboard.

### Method 2: Manual Setup

#### Deploy Backend

1. **Create a new Web Service on Render:**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the service:**
   - **Name:** `cv-generator-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or your choice)

3. **Add Environment Variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (Render will override this)

4. **Deploy:**
   Click "Create Web Service"

#### Deploy Frontend (Optional - Separate Hosting)

1. **Build the frontend with API URL:**
   ```bash
   cd frontend
   REACT_APP_API_URL=https://your-backend-url.onrender.com npm run build
   ```

2. **Deploy to Render Static Site:**
   - Click "New +" → "Static Site"
   - Connect repository
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/build`

### Method 3: Backend Serves Frontend (Simpler)

This method hosts both frontend and backend together.

1. **Update server.js** to serve the frontend build:
   ```javascript
   // Add this before your routes in server.js
   const path = require('path');
   
   if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, 'frontend/build')));
     
     app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
     });
   }
   ```

2. **Update package.json** build script:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js",
     "build": "cd frontend && npm install && npm run build",
     "heroku-postbuild": "npm run build"
   }
   ```

3. **Deploy on Render:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

## 📋 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env in frontend folder)
```
REACT_APP_API_URL=http://localhost:5000
```

For production, update `REACT_APP_API_URL` to your Render backend URL.

## 🔧 API Endpoints

### Generate CV
**POST** `/api/generate-cv`

**Body:** FormData with the following fields:
- Personal info: name, fatherName, motherName, etc.
- Contact: email, phone
- Education: sscGpa, hscGpa, graduationCgpa, etc.
- Professional: currentJob, previousJobs (JSON string)
- Additional: skills, languages, hobbies (comma-separated)
- photo: File upload (optional)

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
        "downloadUrl": "/api/download/cv_template_1_xxx.pdf",
        "viewUrl": "/generated/cv_template_1_xxx.pdf"
      },
      "docx": {
        "filename": "cv_template_1_xxx.docx",
        "downloadUrl": "/api/download/cv_template_1_xxx.docx",
        "viewUrl": "/generated/cv_template_1_xxx.docx"
      }
    },
    // ... 9 more templates
  ]
}
```

### Download CV
**GET** `/api/download/:filename`

Downloads the specified CV file.

## 🎨 Features

- ✅ 10 Different CV Templates
- ✅ PDF Export
- ✅ DOCX Export
- ✅ Photo Upload
- ✅ Multiple Educational Qualifications
- ✅ Work Experience Tracking
- ✅ Skills, Languages, Hobbies
- ✅ Responsive Design
- ✅ Download & View Options
- ✅ Professional Layouts

## 🐛 Troubleshooting

### Backend not starting
- Check if port 5000 is available
- Verify all dependencies are installed: `npm install`
- Check for error logs in console

### Frontend can't connect to backend
- Verify backend is running
- Check `proxy` in frontend/package.json is set to `http://localhost:5000`
- Check CORS settings in backend

### File upload not working
- Ensure `uploads/` directory exists and has write permissions
- Check file size (max 5MB)
- Verify file type is jpeg, jpg, or png

### PDFs not generating
- Ensure `generated/` directory exists
- Check pdfkit installation
- Verify all CV data fields are provided

## 📦 Dependencies

### Backend
- express: Web framework
- cors: Cross-origin resource sharing
- multer: File upload handling
- pdfkit: PDF generation
- docx: DOCX generation
- uuid: Unique ID generation
- dotenv: Environment variables

### Frontend
- react: UI framework
- axios: HTTP client
- react-scripts: Build tools

## 🔐 Security Notes

- File uploads are restricted to images only
- File size limited to 5MB
- Input validation on both client and server
- CORS enabled for development (configure for production)

## 📝 License

ISC

## 👨‍💻 Support

For issues or questions, please create an issue in the GitHub repository.
