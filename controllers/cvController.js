const path = require('path');
const fs = require('fs');
const pdfService = require('../services/pdfService');
const docxService = require('../services/docxService');

exports.generateCV = async (req, res) => {
  try {
    // Parse selected templates
    const selectedTemplates = req.body.selectedTemplates 
      ? JSON.parse(req.body.selectedTemplates) 
      : [];

    if (selectedTemplates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one template'
      });
    }

    // Parse CV data from request
    const cvData = {
      // Personal Information
      name: req.body.name,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      presentAddress: req.body.presentAddress,
      permanentAddress: req.body.permanentAddress,
      dateOfBirth: req.body.dateOfBirth,
      age: req.body.age,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      nationality: req.body.nationality,
      nid: req.body.nid,
      passport: req.body.passport,
      religion: req.body.religion,
      
      // Contact Information
      email: req.body.email,
      phone: req.body.phone,
      alternatePhone: req.body.alternatePhone,
      linkedIn: req.body.linkedIn,
      website: req.body.website,
      
      // Education
      education: {
        ssc: {
          gpa: req.body.sscGpa,
          schoolName: req.body.sscSchool,
          board: req.body.sscBoard,
          year: req.body.sscYear,
          group: req.body.sscGroup
        },
        hsc: {
          gpa: req.body.hscGpa,
          collegeName: req.body.hscCollege,
          board: req.body.hscBoard,
          year: req.body.hscYear,
          group: req.body.hscGroup
        },
        graduation: {
          degree: req.body.graduationDegree,
          subject: req.body.graduationSubject,
          cgpa: req.body.graduationCgpa,
          institution: req.body.graduationInstitution,
          year: req.body.graduationYear
        }
      },
      
      // Professional Information
      currentJob: req.body.currentJob ? {
        title: req.body.currentJobTitle,
        company: req.body.currentJobCompany,
        duration: req.body.currentJobDuration,
        location: req.body.currentJobLocation,
        responsibilities: req.body.currentJobResponsibilities
      } : null,
      
      previousJobs: req.body.previousJobs ? JSON.parse(req.body.previousJobs) : [],
      
      // Additional Information
      skills: req.body.skills ? req.body.skills.split(',').map(s => s.trim()) : [],
      languages: req.body.languages ? req.body.languages.split(',').map(l => l.trim()) : [],
      hobbies: req.body.hobbies ? req.body.hobbies.split(',').map(h => h.trim()) : [],
      objective: req.body.objective,
      summary: req.body.summary,
      certifications: req.body.certifications,
      awards: req.body.awards,
      references: req.body.references,
      
      // Photo
      photo: req.file ? `/uploads/${req.file.filename}` : null
    };

    // Generate CVs for selected templates only
    const generatedFiles = [];

    for (let templateId of selectedTemplates) {
      // Generate PDF
      const pdfFilename = `cv_template_${templateId}_${Date.now()}.pdf`;
      const pdfPath = path.join('generated', pdfFilename);
      await pdfService.generatePDF(cvData, templateId, pdfPath);
      
      // Generate DOCX
      const docxFilename = `cv_template_${templateId}_${Date.now()}.docx`;
      const docxPath = path.join('generated', docxFilename);
      await docxService.generateDOCX(cvData, templateId, docxPath);
      
      generatedFiles.push({
        templateId: templateId,
        templateName: `Template ${templateId}`,
        pdf: {
          filename: pdfFilename,
          downloadUrl: `/api/download/${pdfFilename}`,
          viewUrl: `/generated/${pdfFilename}`
        },
        docx: {
          filename: docxFilename,
          downloadUrl: `/api/download/${docxFilename}`,
          viewUrl: `/generated/${docxFilename}`
        }
      });
    }

    res.json({
      success: true,
      message: 'CVs generated successfully',
      data: generatedFiles
    });

  } catch (error) {
    console.error('Error generating CV:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate CV',
      message: error.message
    });
  }
};

exports.downloadCV = (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'generated', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({
          success: false,
          error: 'Failed to download file'
        });
      }
    });
  } catch (error) {
    console.error('Error in download:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to download file',
      message: error.message
    });
  }
};
