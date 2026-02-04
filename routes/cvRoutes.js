const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const cvController = require('../controllers/cvController');

// Generate CV route
router.post('/generate-cv', upload.single('photo'), cvController.generateCV);

// Get generated CV file
router.get('/download/:filename', cvController.downloadCV);

module.exports = router;
