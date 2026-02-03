const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const cvRoutes = require('./routes/cvRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Create necessary directories
const dirs = ['uploads', 'generated_cvs'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
}));

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/generated_cvs', express.static('generated_cvs'));

// Routes
app.use('/api/cv', cvRoutes);

// Root route - API documentation
app.get('/', (req, res) => {
  res.json({
    name: 'CV Generator Backend API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: {
        method: 'GET',
        path: '/health',
        description: 'Check if the server is running'
      },
      generateCV: {
        method: 'POST',
        path: '/api/cv/generate',
        description: 'Generate 10 CV templates in PDF and DOCX formats',
        contentType: 'multipart/form-data',
        requiredFields: [
          'name', 'fathersName', 'mothersName', 'presentAddress', 'permanentAddress',
          'sscGPA', 'sscSchool', 'sscBoard', 'hscGPA', 'hscCollege', 'hscBoard',
          'graduationSubject', 'graduationCGPA', 'graduationInstitution',
          'hobbies', 'currentJob', 'previousJob', 'jobDuration',
          'maritalStatus', 'gender', 'age', 'dob', 'nationality',
          'languages', 'email', 'contact', 'skills'
        ],
        optionalFields: ['photo (max 5MB, JPG/PNG/GIF)'],
        response: 'Returns session ID and URLs for all generated CVs'
      },
      viewCV: {
        method: 'GET',
        path: '/api/cv/:sessionId/:templateId/:format',
        description: 'View a specific CV (format: pdf or docx)',
        example: '/api/cv/abc-123/1/pdf'
      },
      downloadCV: {
        method: 'GET',
        path: '/api/cv/download/:sessionId/:templateId/:format',
        description: 'Download a specific CV',
        example: '/api/cv/download/abc-123/1/pdf'
      }
    },
    features: [
      '10 unique CV templates with different designs and colors',
      'PDF and DOCX format support',
      'Photo upload and embedding',
      'Professional layouts (single-column and two-column)',
      'Instant download and preview options'
    ],
    documentation: 'https://github.com/safiullah-foragy/cv_generator_backend'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'CV Generator Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
