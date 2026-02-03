# CV Generator Backend

A comprehensive backend API for generating professional CVs in multiple formats (PDF and DOCX) with 10 different design templates.

## Features

- ✅ **10 Different CV Templates** - Professional, Modern, Executive, Creative, and more
- ✅ **Dual Format Export** - Generate both PDF and DOCX files
- ✅ **Photo Upload Support** - Include profile photos in CVs
- ✅ **RESTful API** - Easy integration with any frontend (React, Vue, Angular, etc.)
- ✅ **Comprehensive Data Support** - Personal info, education, work experience, skills, and more
- ✅ **Download & View Options** - Preview CVs before downloading

## Installation

1. **Clone the repository**
```bash
cd cv_generator_backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory (already created):
```
PORT=5000
NODE_ENV=development
UPLOAD_DIR=./uploads
OUTPUT_DIR=./generated_cvs
```

4. **Start the server**

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### 1. Generate CVs
**POST** `/api/cv/generate`

Generates 10 CV variants in both PDF and DOCX formats.

**Request:** `multipart/form-data`

**Form Fields:**
```javascript
{
  // Personal Information
  "name": "John Doe",
  "fathersName": "Michael Doe",
  "mothersName": "Sarah Doe",
  "presentAddress": "123 Main St, Dhaka",
  "permanentAddress": "456 Home St, Chittagong",
  "dateOfBirth": "1995-05-15",
  "age": "29",
  "gender": "Male",
  "maritalStatus": "Single",
  "nationality": "Bangladeshi",
  "gmail": "john.doe@gmail.com",
  "contactNumber": "+880 1234-567890",
  
  // Education
  "sscGPA": "5.00",
  "sscSchool": "ABC High School",
  "sscBoard": "Dhaka",
  "hscGPA": "5.00",
  "hscCollege": "XYZ College",
  "hscBoard": "Dhaka",
  "graduationSubject": "Computer Science & Engineering",
  "graduationCGPA": "3.75",
  "graduationInstitution": "Bangladesh University of Engineering and Technology",
  
  // Employment
  "currentJob": "Senior Software Engineer at Tech Corp",
  "previousJobs": [
    {
      "position": "Software Engineer",
      "company": "StartUp Inc",
      "duration": "2020-2023"
    },
    {
      "position": "Junior Developer",
      "company": "Dev Solutions",
      "duration": "2018-2020"
    }
  ],
  
  // Skills & Others
  "skills": "JavaScript, React, Node.js, Python, MongoDB, Docker",
  // or as array: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "Docker"]
  "languages": "Bengali, English, Hindi",
  "hobbies": "Reading, Traveling, Photography",
  
  // Photo (file upload)
  "photo": <file>
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "cvs": [
    {
      "templateId": 1,
      "templateName": "Professional Classic",
      "templateDescription": "A clean, traditional CV format...",
      "pdf": {
        "path": "generated_cvs/550e8400-.../cv_template_1.pdf",
        "url": "/api/cv/550e8400-.../1/pdf",
        "downloadUrl": "/api/cv/download/550e8400-.../1/pdf"
      },
      "docx": {
        "path": "generated_cvs/550e8400-.../cv_template_1.docx",
        "url": "/api/cv/550e8400-.../1/docx",
        "downloadUrl": "/api/cv/download/550e8400-.../1/docx"
      }
    },
    // ... 9 more templates
  ],
  "message": "Successfully generated 10 CV variants"
}
```

### 2. View CV
**GET** `/api/cv/:sessionId/:templateId/:format`

View a specific CV in the browser.

**Parameters:**
- `sessionId`: Session ID from generation response
- `templateId`: Template number (1-10)
- `format`: `pdf` or `docx`

**Example:**
```
GET /api/cv/550e8400-e29b-41d4-a716-446655440000/1/pdf
```

### 3. Download CV
**GET** `/api/cv/download/:sessionId/:templateId/:format`

Download a specific CV.

**Parameters:**
- `sessionId`: Session ID from generation response
- `templateId`: Template number (1-10)
- `format`: `pdf` or `docx`

**Example:**
```
GET /api/cv/download/550e8400-e29b-41d4-a716-446655440000/1/pdf
```

### 4. Get Session CVs
**GET** `/api/cv/session/:sessionId`

Get all CVs for a specific session.

**Example:**
```
GET /api/cv/session/550e8400-e29b-41d4-a716-446655440000
```

### 5. Health Check
**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "CV Generator Backend is running"
}
```

## CV Templates

The backend generates 10 different CV designs:

1. **Professional Classic** - Clean, traditional format for corporate positions
2. **Modern Blue** - Contemporary design with blue accents for tech roles
3. **Executive Elite** - Sophisticated layout for senior-level positions
4. **Creative Bold** - Eye-catching design for creative professionals
5. **Minimalist Green** - Clean eco-friendly design with green tones
6. **Corporate Gray** - Professional gray-toned design for business roles
7. **Tech Orange** - Dynamic orange theme for tech startups
8. **Academic Formal** - Traditional format for academic positions
9. **Elegant Purple** - Sophisticated purple design for standout applications
10. **Fresh Teal** - Modern teal theme for a fresh professional look

Each template comes in two layout styles:
- **Single Column** - Traditional top-to-bottom layout
- **Two Column** - Modern sidebar layout with contact info on the side

## Frontend Integration Example

### React Example

```javascript
import axios from 'axios';

const generateCV = async (formData) => {
  const data = new FormData();
  
  // Add all form fields
  Object.keys(formData).forEach(key => {
    if (key === 'photo' && formData[key]) {
      data.append('photo', formData[key]);
    } else if (key === 'previousJobs') {
      data.append(key, JSON.stringify(formData[key]));
    } else {
      data.append(key, formData[key]);
    }
  });

  try {
    const response = await axios.post('http://localhost:5000/api/cv/generate', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
};

// Usage
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await generateCV(formData);
  
  // Display all 10 CV variants with download options
  result.cvs.forEach(cv => {
    console.log(`Template ${cv.templateId}: ${cv.templateName}`);
    console.log(`PDF: ${cv.pdf.downloadUrl}`);
    console.log(`DOCX: ${cv.docx.downloadUrl}`);
  });
};
```

### HTML/JavaScript Example

```html
<form id="cvForm" enctype="multipart/form-data">
  <input type="text" name="name" placeholder="Full Name" required>
  <input type="file" name="photo" accept="image/*">
  <!-- Add all other fields -->
  <button type="submit">Generate CV</button>
</form>

<script>
document.getElementById('cvForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  const response = await fetch('http://localhost:5000/api/cv/generate', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  
  // Display download links
  result.cvs.forEach(cv => {
    console.log(`${cv.templateName} - PDF: ${cv.pdf.downloadUrl}`);
    console.log(`${cv.templateName} - DOCX: ${cv.docx.downloadUrl}`);
  });
});
</script>
```

## Project Structure

```
cv_generator_backend/
├── controllers/
│   └── cvController.js       # Request handlers
├── routes/
│   └── cvRoutes.js          # API routes
├── services/
│   ├── pdfService.js        # PDF generation logic
│   ├── docxService.js       # DOCX generation logic
│   └── templateService.js   # Template definitions
├── uploads/                  # Uploaded photos
├── generated_cvs/           # Generated CV files
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── server.js                # Main application file
└── README.md
```

## Technologies Used

- **Express.js** - Web framework
- **Puppeteer** - PDF generation from HTML
- **docx** - DOCX document generation
- **Multer/Express-FileUpload** - File upload handling
- **UUID** - Unique session ID generation
- **CORS** - Cross-origin resource sharing

## Error Handling

The API includes comprehensive error handling:
- Invalid file uploads
- Missing required fields
- File not found errors
- Server errors

All errors return appropriate HTTP status codes and error messages.

## File Size Limits

- Photo uploads: Maximum 5MB
- Supported image formats: JPG, PNG, GIF

## Browser Compatibility

Generated PDFs and DOCX files are compatible with:
- Adobe Acrobat Reader
- Microsoft Word (2010+)
- Google Docs
- LibreOffice
- All modern web browsers

## Security Considerations

- File upload validation
- File size limits
- Sanitized file names
- Protected file paths
- CORS enabled for cross-origin requests

## Future Enhancements

- [ ] Add more CV templates
- [ ] Custom color scheme selection
- [ ] Template preview before generation
- [ ] Email delivery option
- [ ] Cloud storage integration
- [ ] User authentication
- [ ] CV history tracking
- [ ] Custom sections

## License

ISC

## Support

For issues and questions, please create an issue in the repository.

## Author

CV Generator Backend - 2026
