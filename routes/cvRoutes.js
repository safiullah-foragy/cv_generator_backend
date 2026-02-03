const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// Generate CVs from form data
router.post('/generate', cvController.generateCVs);

// Get specific CV
router.get('/:sessionId/:templateId/:format', cvController.getCV);

// Download specific CV
router.get('/download/:sessionId/:templateId/:format', cvController.downloadCV);

// Get all generated CVs for a session
router.get('/session/:sessionId', cvController.getSessionCVs);

module.exports = router;
