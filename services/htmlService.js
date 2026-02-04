const path = require('path');
const fs = require('fs');

// Alternative PDF Service using HTML-to-text approach
// This is a lightweight alternative if Puppeteer has installation issues

exports.generatePDF = async (cvData, template, sessionId, templateId) => {
  try {
    const html = generateHTML(cvData, template);
    const outputPath = path.join('generated_cvs', sessionId, `cv_template_${templateId}.html`);
    
    // Save as HTML file (can be converted to PDF in browser or using other tools)
    fs.writeFileSync(outputPath, html);
    
    console.log(`HTML CV generated at: ${outputPath}`);
    console.log('Note: For PDF conversion, you can:');
    console.log('1. Open the HTML file in a browser and use Print to PDF');
    console.log('2. Install Puppeteer properly: npm install puppeteer');
    console.log('3. Use an online HTML to PDF converter');
    
    return outputPath;
  } catch (error) {
    console.error('Error generating HTML:', error);
    throw error;
  }
};

function generateHTML(data, template) {
  const style = template.style;
  const photoHtml = data.photoPath 
    ? `<img src="file://${path.resolve(data.photoPath)}" alt="Profile Photo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid ${style.accentColor};">` 
    : '';

  if (style.layout === 'two-column') {
    return generateTwoColumnHTML(data, template, photoHtml);
  } else {
    return generateSingleColumnHTML(data, template, photoHtml);
  }
}

function generateSingleColumnHTML(data, template, photoHtml) {
  const style = template.style;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>CV - ${data.name || 'Curriculum Vitae'}</title>
      <style>
        @media print {
          body { margin: 0; }
          @page { size: A4; margin: 20mm 15mm; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: ${style.fontFamily}; 
          color: #333; 
          line-height: 1.6;
          padding: 20px;
          max-width: 210mm;
          margin: 0 auto;
          background: white;
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
          padding-bottom: 20px;
          border-bottom: 3px solid ${style.accentColor};
        }
        .photo { margin-bottom: 15px; }
        h1 { 
          color: ${style.primaryColor}; 
          font-size: 32px; 
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        h2 { 
          color: ${style.secondaryColor}; 
          font-size: 20px; 
          margin-top: 20px; 
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 2px solid ${style.accentColor};
        }
        h3 { 
          color: ${style.primaryColor}; 
          font-size: 16px; 
          margin-top: 10px;
        }
        .contact-info { 
          margin: 15px 0; 
          text-align: center;
          color: #666;
        }
        .contact-info span {
          margin: 0 10px;
        }
        .section { 
          margin-bottom: 25px; 
          page-break-inside: avoid;
        }
        .item { 
          margin-bottom: 15px; 
          padding-left: 10px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .duration { 
          color: ${style.secondaryColor}; 
          font-style: italic;
          font-size: 14px;
        }
        .skills { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 10px;
        }
        .skill-tag { 
          background: ${style.accentColor}; 
          color: white; 
          padding: 5px 15px; 
          border-radius: 15px;
          font-size: 14px;
        }
        .grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 10px;
        }
        strong { color: ${style.primaryColor}; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="photo">${photoHtml}</div>
        <h1>${data.name || 'Name Not Provided'}</h1>
        <div class="contact-info">
          <span>📧 ${data.gmail || 'N/A'}</span>
          <span>📱 ${data.contactNumber || 'N/A'}</span>
          <span>🌍 ${data.nationality || 'N/A'}</span>
        </div>
      </div>

      <div class="section">
        <h2>Personal Information</h2>
        <div class="grid">
          <div><strong>Father's Name:</strong> ${data.fathersName || 'N/A'}</div>
          <div><strong>Mother's Name:</strong> ${data.mothersName || 'N/A'}</div>
          <div><strong>Date of Birth:</strong> ${data.dateOfBirth || 'N/A'}</div>
          <div><strong>Age:</strong> ${data.age || 'N/A'}</div>
          <div><strong>Gender:</strong> ${data.gender || 'N/A'}</div>
          <div><strong>Marital Status:</strong> ${data.maritalStatus || 'N/A'}</div>
        </div>
        <div style="margin-top: 10px;">
          <div><strong>Present Address:</strong> ${data.presentAddress || 'N/A'}</div>
          <div><strong>Permanent Address:</strong> ${data.permanentAddress || 'N/A'}</div>
        </div>
      </div>

      <div class="section">
        <h2>Education</h2>
        <div class="item">
          <h3>Graduation</h3>
          <div><strong>Subject:</strong> ${data.graduationSubject || 'N/A'}</div>
          <div><strong>CGPA:</strong> ${data.graduationCGPA || 'N/A'}</div>
          <div><strong>Institution:</strong> ${data.graduationInstitution || 'N/A'}</div>
        </div>
        <div class="item">
          <h3>HSC</h3>
          <div><strong>GPA:</strong> ${data.hscGPA || 'N/A'}</div>
          <div><strong>College:</strong> ${data.hscCollege || 'N/A'}</div>
          <div><strong>Board:</strong> ${data.hscBoard || 'N/A'}</div>
        </div>
        <div class="item">
          <h3>SSC</h3>
          <div><strong>GPA:</strong> ${data.sscGPA || 'N/A'}</div>
          <div><strong>School:</strong> ${data.sscSchool || 'N/A'}</div>
          <div><strong>Board:</strong> ${data.sscBoard || 'N/A'}</div>
        </div>
      </div>

      ${data.currentJob ? `
        <div class="section">
          <h2>Current Employment</h2>
          <div class="item">
            <div><strong>Position:</strong> ${data.currentJob}</div>
          </div>
        </div>
      ` : ''}

      ${data.previousJobs && data.previousJobs.length > 0 ? `
        <div class="section">
          <h2>Previous Employment</h2>
          ${data.previousJobs.map(job => `
            <div class="item">
              <div class="item-header">
                <strong>${job.position || 'Position Not Specified'}</strong>
                <span class="duration">${job.duration || 'Duration N/A'}</span>
              </div>
              <div>${job.company || 'Company Not Specified'}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills ? `
        <div class="section">
          <h2>Skills</h2>
          <div class="skills">
            ${(Array.isArray(data.skills) ? data.skills : data.skills.split(',')).map(skill => 
              `<span class="skill-tag">${skill.trim()}</span>`
            ).join('')}
          </div>
        </div>
      ` : ''}

      ${data.languages ? `
        <div class="section">
          <h2>Languages</h2>
          <div>${Array.isArray(data.languages) ? data.languages.join(', ') : data.languages}</div>
        </div>
      ` : ''}

      ${data.hobbies ? `
        <div class="section">
          <h2>Hobbies & Interests</h2>
          <div>${Array.isArray(data.hobbies) ? data.hobbies.join(', ') : data.hobbies}</div>
        </div>
      ` : ''}
      
      <script>
        // Optional: Auto-print on page load
        // window.onload = () => window.print();
      </script>
    </body>
    </html>
  `;
}

function generateTwoColumnHTML(data, template, photoHtml) {
  const style = template.style;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>CV - ${data.name || 'Curriculum Vitae'}</title>
      <style>
        @media print {
          body { margin: 0; }
          @page { size: A4; margin: 0; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: ${style.fontFamily}; 
          color: #333; 
          line-height: 1.6;
          background: white;
        }
        .container {
          display: flex;
          min-height: 297mm;
        }
        .sidebar {
          width: 35%;
          background: ${style.primaryColor};
          color: white;
          padding: 30px 20px;
        }
        .main-content {
          width: 65%;
          padding: 30px;
        }
        .photo-container {
          text-align: center;
          margin-bottom: 20px;
        }
        .photo-container img {
          border: 3px solid white;
        }
        h1 { 
          font-size: 28px; 
          margin-bottom: 5px;
          color: white;
        }
        .sidebar h2 {
          color: ${style.accentColor};
          font-size: 18px;
          margin-top: 25px;
          margin-bottom: 10px;
          border-bottom: 2px solid ${style.accentColor};
          padding-bottom: 5px;
        }
        .main-content h2 {
          color: ${style.primaryColor};
          font-size: 20px;
          margin-top: 20px;
          margin-bottom: 15px;
          border-bottom: 2px solid ${style.accentColor};
          padding-bottom: 5px;
        }
        h3 { 
          color: ${style.secondaryColor}; 
          font-size: 16px; 
          margin-top: 10px;
        }
        .contact-item {
          margin: 8px 0;
          font-size: 14px;
        }
        .section { 
          margin-bottom: 20px; 
          page-break-inside: avoid;
        }
        .sidebar .section {
          font-size: 14px;
        }
        .item { 
          margin-bottom: 15px; 
        }
        .item-header {
          margin-bottom: 5px;
        }
        .duration { 
          color: ${style.secondaryColor}; 
          font-style: italic;
          font-size: 14px;
          display: block;
        }
        .skill-list {
          margin-top: 5px;
        }
        .skill-item {
          background: ${style.accentColor};
          padding: 4px 12px;
          border-radius: 12px;
          display: inline-block;
          margin: 4px 4px 4px 0;
          font-size: 13px;
        }
        strong { font-weight: 600; }
        .info-grid div {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="sidebar">
          <div class="photo-container">${photoHtml}</div>
          <h1>${data.name || 'Name Not Provided'}</h1>
          
          <div class="section">
            <h2>Contact</h2>
            <div class="contact-item">📧 ${data.gmail || 'N/A'}</div>
            <div class="contact-item">📱 ${data.contactNumber || 'N/A'}</div>
            <div class="contact-item">📍 ${data.presentAddress || 'N/A'}</div>
          </div>

          <div class="section">
            <h2>Personal Details</h2>
            <div class="info-grid">
              <div><strong>DOB:</strong> ${data.dateOfBirth || 'N/A'}</div>
              <div><strong>Age:</strong> ${data.age || 'N/A'}</div>
              <div><strong>Gender:</strong> ${data.gender || 'N/A'}</div>
              <div><strong>Marital Status:</strong> ${data.maritalStatus || 'N/A'}</div>
              <div><strong>Nationality:</strong> ${data.nationality || 'N/A'}</div>
            </div>
          </div>

          ${data.skills ? `
            <div class="section">
              <h2>Skills</h2>
              <div class="skill-list">
                ${(Array.isArray(data.skills) ? data.skills : data.skills.split(',')).map(skill => 
                  `<span class="skill-item">${skill.trim()}</span>`
                ).join('')}
              </div>
            </div>
          ` : ''}

          ${data.languages ? `
            <div class="section">
              <h2>Languages</h2>
              <div>${Array.isArray(data.languages) ? data.languages.join(', ') : data.languages}</div>
            </div>
          ` : ''}

          ${data.hobbies ? `
            <div class="section">
              <h2>Hobbies</h2>
              <div>${Array.isArray(data.hobbies) ? data.hobbies.join(', ') : data.hobbies}</div>
            </div>
          ` : ''}
        </div>

        <div class="main-content">
          <div class="section">
            <h2>Education</h2>
            <div class="item">
              <div class="item-header">
                <h3>Graduation - ${data.graduationSubject || 'N/A'}</h3>
                <div><strong>CGPA:</strong> ${data.graduationCGPA || 'N/A'}</div>
              </div>
              <div>${data.graduationInstitution || 'N/A'}</div>
            </div>
            <div class="item">
              <div class="item-header">
                <h3>Higher Secondary Certificate (HSC)</h3>
                <div><strong>GPA:</strong> ${data.hscGPA || 'N/A'}</div>
              </div>
              <div>${data.hscCollege || 'N/A'} - ${data.hscBoard || 'N/A'} Board</div>
            </div>
            <div class="item">
              <div class="item-header">
                <h3>Secondary School Certificate (SSC)</h3>
                <div><strong>GPA:</strong> ${data.sscGPA || 'N/A'}</div>
              </div>
              <div>${data.sscSchool || 'N/A'} - ${data.sscBoard || 'N/A'} Board</div>
            </div>
          </div>

          ${data.currentJob ? `
            <div class="section">
              <h2>Current Employment</h2>
              <div class="item">
                <strong>${data.currentJob}</strong>
              </div>
            </div>
          ` : ''}

          ${data.previousJobs && data.previousJobs.length > 0 ? `
            <div class="section">
              <h2>Work Experience</h2>
              ${data.previousJobs.map(job => `
                <div class="item">
                  <h3>${job.position || 'Position Not Specified'}</h3>
                  <span class="duration">${job.duration || 'Duration N/A'}</span>
                  <div>${job.company || 'Company Not Specified'}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="section">
            <h2>Family Information</h2>
            <div><strong>Father's Name:</strong> ${data.fathersName || 'N/A'}</div>
            <div><strong>Mother's Name:</strong> ${data.mothersName || 'N/A'}</div>
            <div style="margin-top: 10px;"><strong>Permanent Address:</strong> ${data.permanentAddress || 'N/A'}</div>
          </div>
        </div>
      </div>
      
      <script>
        // Optional: Auto-print on page load
        // window.onload = () => window.print();
      </script>
    </body>
    </html>
  `;
}

module.exports = exports;
