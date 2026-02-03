const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const pdfService = require('../services/pdfService');
const docxService = require('../services/docxService');
const templateService = require('../services/templateService');

// Generate all CV variants
exports.generateCVs = async (req, res) => {
  try {
    const cvData = req.body;
    
    // Handle photo upload
    let photoPath = null;
    if (req.files && req.files.photo) {
      const photo = req.files.photo;
      const photoName = `${Date.now()}_${photo.name}`;
      photoPath = path.join('uploads', photoName);
      await photo.mv(photoPath);
      cvData.photoPath = photoPath;
    }

    // Create session ID for this CV generation
    const sessionId = uuidv4();
    const sessionDir = path.join('generated_cvs', sessionId);
    
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }

    // Generate 10 different CV templates
    const templates = templateService.getAllTemplates();
    const generatedCVs = [];

    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];
      const templateId = i + 1;
      
      // Generate PDF
      const pdfPath = await pdfService.generatePDF(cvData, template, sessionId, templateId);
      
      // Generate DOCX
      const docxPath = await docxService.generateDOCX(cvData, template, sessionId, templateId);
      
      generatedCVs.push({
        templateId,
        templateName: template.name,
        templateDescription: template.description,
        pdf: {
          path: pdfPath,
          url: `/api/cv/${sessionId}/${templateId}/pdf`,
          downloadUrl: `/api/cv/download/${sessionId}/${templateId}/pdf`
        },
        docx: {
          path: docxPath,
          url: `/api/cv/${sessionId}/${templateId}/docx`,
          downloadUrl: `/api/cv/download/${sessionId}/${templateId}/docx`
        }
      });
    }

    res.json({
      success: true,
      sessionId,
      cvs: generatedCVs,
      message: `Successfully generated ${generatedCVs.length} CV variants`
    });

  } catch (error) {
    console.error('Error generating CVs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate CVs',
      message: error.message
    });
  }
};

// Get specific CV for viewing
exports.getCV = async (req, res) => {
  try {
    const { sessionId, templateId, format } = req.params;
    const extension = format === 'pdf' ? 'pdf' : 'docx';
    const filePath = path.join('generated_cvs', sessionId, `cv_template_${templateId}.${extension}`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.sendFile(path.resolve(filePath));
  } catch (error) {
    console.error('Error retrieving CV:', error);
    res.status(500).json({ error: 'Failed to retrieve CV' });
  }
};

// Download specific CV
exports.downloadCV = async (req, res) => {
  try {
    const { sessionId, templateId, format } = req.params;
    const extension = format === 'pdf' ? 'pdf' : 'docx';
    const filePath = path.join('generated_cvs', sessionId, `cv_template_${templateId}.${extension}`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const fileName = `CV_Template_${templateId}.${extension}`;
    res.download(path.resolve(filePath), fileName);
  } catch (error) {
    console.error('Error downloading CV:', error);
    res.status(500).json({ error: 'Failed to download CV' });
  }
};

// Get all CVs for a session
exports.getSessionCVs = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionDir = path.join('generated_cvs', sessionId);

    if (!fs.existsSync(sessionDir)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const files = fs.readdirSync(sessionDir);
    const cvs = [];

    for (let i = 1; i <= 10; i++) {
      const pdfFile = `cv_template_${i}.pdf`;
      const docxFile = `cv_template_${i}.docx`;

      if (files.includes(pdfFile) && files.includes(docxFile)) {
        cvs.push({
          templateId: i,
          pdf: {
            url: `/api/cv/${sessionId}/${i}/pdf`,
            downloadUrl: `/api/cv/download/${sessionId}/${i}/pdf`
          },
          docx: {
            url: `/api/cv/${sessionId}/${i}/docx`,
            downloadUrl: `/api/cv/download/${sessionId}/${i}/docx`
          }
        });
      }
    }

    res.json({ sessionId, cvs });
  } catch (error) {
    console.error('Error retrieving session CVs:', error);
    res.status(500).json({ error: 'Failed to retrieve CVs' });
  }
};
