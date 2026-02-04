const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Template styles configuration - 20 unique designs
const templateStyles = {
  1: { primaryColor: '#2C3E50', secondaryColor: '#3498DB', fontStyle: 'professional', fontSize: { title: 28, section: 14, body: 10 } },
  2: { primaryColor: '#27AE60', secondaryColor: '#2ECC71', fontStyle: 'modern', fontSize: { title: 24, section: 13, body: 10 } },
  3: { primaryColor: '#8E44AD', secondaryColor: '#9B59B6', fontStyle: 'creative', fontSize: { title: 26, section: 14, body: 9 } },
  4: { primaryColor: '#E74C3C', secondaryColor: '#C0392B', fontStyle: 'bold', fontSize: { title: 30, section: 15, body: 11 } },
  5: { primaryColor: '#F39C12', secondaryColor: '#F1C40F', fontStyle: 'elegant', fontSize: { title: 25, section: 13, body: 10 } },
  6: { primaryColor: '#1ABC9C', secondaryColor: '#16A085', fontStyle: 'clean', fontSize: { title: 24, section: 12, body: 9 } },
  7: { primaryColor: '#34495E', secondaryColor: '#95A5A6', fontStyle: 'minimal', fontSize: { title: 22, section: 12, body: 9 } },
  8: { primaryColor: '#E67E22', secondaryColor: '#D35400', fontStyle: 'warm', fontSize: { title: 27, section: 14, body: 10 } },
  9: { primaryColor: '#16A085', secondaryColor: '#1ABC9C', fontStyle: 'fresh', fontSize: { title: 26, section: 13, body: 10 } },
  10: { primaryColor: '#2980B9', secondaryColor: '#3498DB', fontStyle: 'classic', fontSize: { title: 28, section: 14, body: 10 } },
  11: { primaryColor: '#D35400', secondaryColor: '#E67E22', fontStyle: 'vibrant', fontSize: { title: 32, section: 15, body: 11 } },
  12: { primaryColor: '#7F8C8D', secondaryColor: '#BDC3C7', fontStyle: 'corporate', fontSize: { title: 24, section: 13, body: 10 } },
  13: { primaryColor: '#C0392B', secondaryColor: '#E74C3C', fontStyle: 'executive', fontSize: { title: 29, section: 14, body: 10 } },
  14: { primaryColor: '#16A085', secondaryColor: '#48C9B0', fontStyle: 'contemporary', fontSize: { title: 26, section: 13, body: 9 } },
  15: { primaryColor: '#8E44AD', secondaryColor: '#BB8FCE', fontStyle: 'artistic', fontSize: { title: 28, section: 14, body: 10 } },
  16: { primaryColor: '#34495E', secondaryColor: '#5D6D7E', fontStyle: 'professional-dark', fontSize: { title: 25, section: 13, body: 10 } },
  17: { primaryColor: '#D68910', secondaryColor: '#F8C471', fontStyle: 'energetic', fontSize: { title: 30, section: 15, body: 11 } },
  18: { primaryColor: '#117A65', secondaryColor: '#45B39D', fontStyle: 'nature', fontSize: { title: 26, section: 13, body: 10 } },
  19: { primaryColor: '#6C3483', secondaryColor: '#AF7AC5', fontStyle: 'luxury', fontSize: { title: 27, section: 14, body: 10 } },
  20: { primaryColor: '#1F618D', secondaryColor: '#5DADE2', fontStyle: 'ocean', fontSize: { title: 28, section: 14, body: 10 } }
};

class PDFService {
  async generatePDF(cvData, templateId, outputPath) {
    const style = templateStyles[templateId];
    
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const stream = fs.createWriteStream(outputPath);
        
        doc.pipe(stream);

        // Generate based on template
        switch(templateId) {
          case 1:
            this.generateTemplate1(doc, cvData, style);
            break;
          case 2:
            this.generateTemplate2(doc, cvData, style);
            break;
          case 3:
            this.generateTemplate3(doc, cvData, style);
            break;
          case 4:
            this.generateTemplate4(doc, cvData, style);
            break;
          case 5:
            this.generateTemplate5(doc, cvData, style);
            break;
          case 6:
            this.generateTemplate6(doc, cvData, style);
            break;
          case 7:
            this.generateTemplate7(doc, cvData, style);
            break;
          case 8:
            this.generateTemplate8(doc, cvData, style);
            break;
          case 9:
            this.generateTemplate9(doc, cvData, style);
            break;
          case 10:
            this.generateTemplate10(doc, cvData, style);
            break;
          case 11:
            this.generateTemplate11(doc, cvData, style);
            break;
          case 12:
            this.generateTemplate12(doc, cvData, style);
            break;
          case 13:
            this.generateTemplate13(doc, cvData, style);
            break;
          case 14:
            this.generateTemplate14(doc, cvData, style);
            break;
          case 15:
            this.generateTemplate15(doc, cvData, style);
            break;
          case 16:
            this.generateTemplate16(doc, cvData, style);
            break;
          case 17:
            this.generateTemplate17(doc, cvData, style);
            break;
          case 18:
            this.generateTemplate18(doc, cvData, style);
            break;
          case 19:
            this.generateTemplate19(doc, cvData, style);
            break;
          case 20:
            this.generateTemplate20(doc, cvData, style);
            break;
          default:
            this.generateTemplate1(doc, cvData, style);
        }

        doc.end();
        
        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Template 1: Professional with header and photo
  generateTemplate1(doc, data, style) {
    let y = 50;
    
    // Header with name
    doc.rect(0, 0, 612, 100).fill(style.primaryColor);
    
    // Add photo in header with double border frame
    this.addPhotoWithFrame(doc, data.photo, 490, 15, 70, 'double-border', '#FFFFFF');
    
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 50, 35, { width: 420 });
    
    // Contact info in header
    let contactInfo = `${data.email} | ${data.phone}`;
    if (data.alternatePhone) contactInfo += ` | ${data.alternatePhone}`;
    doc.fontSize(10)
       .text(contactInfo, 50, 70, { width: 420 });
    if (data.linkedIn || data.website) {
      let webInfo = '';
      if (data.linkedIn) webInfo += data.linkedIn;
      if (data.website) webInfo += (webInfo ? ' | ' : '') + data.website;
      doc.fontSize(8).text(webInfo, 50, 82, { width: 420 });
    }
    
    y = 120;
    doc.fillColor('#000000');
    
    // Objective
    if (data.objective) {
      this.addSection(doc, 'CAREER OBJECTIVE', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.objective, 50, y, { width: 500, align: 'justify' });
      y += Math.ceil(doc.heightOfString(data.objective, { width: 500 }) / 15) * 15 + 20;
    }
    
    // Professional Summary
    if (data.summary) {
      this.addSection(doc, 'PROFESSIONAL SUMMARY', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.summary, 50, y, { width: 500, align: 'justify' });
      y += Math.ceil(doc.heightOfString(data.summary, { width: 500 }) / 15) * 15 + 20;
    }
    
    // Personal Information
    this.addSection(doc, 'PERSONAL INFORMATION', y, style.primaryColor);
    y += 25;
    this.addKeyValue(doc, 'Date of Birth', data.dateOfBirth, y);
    y += 15;
    this.addKeyValue(doc, 'Age', data.age, y);
    y += 15;
    this.addKeyValue(doc, 'Gender', data.gender, y);
    y += 15;
    this.addKeyValue(doc, 'Marital Status', data.maritalStatus, y);
    y += 15;
    this.addKeyValue(doc, 'Nationality', data.nationality, y);
    y += 15;
    if (data.nid) {
      this.addKeyValue(doc, 'NID', data.nid, y);
      y += 15;
    }
    if (data.passport) {
      this.addKeyValue(doc, 'Passport', data.passport, y);
      y += 15;
    }
    if (data.religion) {
      this.addKeyValue(doc, 'Religion', data.religion, y);
      y += 15;
    }
    this.addKeyValue(doc, 'Present Address', data.presentAddress, y);
    y += 20;
    this.addKeyValue(doc, 'Permanent Address', data.permanentAddress, y);
    
    y += 30;
    
    // Family Information
    this.addSection(doc, 'FAMILY INFORMATION', y, style.primaryColor);
    y += 25;
    this.addKeyValue(doc, "Father's Name", data.fatherName, y);
    y += 15;
    this.addKeyValue(doc, "Mother's Name", data.motherName, y);
    
    y += 30;
    
    // Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 80;
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS', y, style.primaryColor);
      y += 25;
      this.addList(doc, data.skills, y);
      y += (data.skills.length * 15) + 20;
    }
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'WORK EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJob(doc, job, y, false);
          y += 40;
        });
      }
    }
    
    // Languages & Hobbies
    if (y > 680) {
      doc.addPage();
      y = 50;
    }
    
    if (data.languages && data.languages.length > 0) {
      this.addSection(doc, 'LANGUAGES', y, style.primaryColor);
      y += 25;
      this.addList(doc, data.languages, y);
      y += (data.languages.length * 15) + 20;
    }
    
    if (data.hobbies && data.hobbies.length > 0) {
      this.addSection(doc, 'HOBBIES', y, style.primaryColor);
      y += 25;
      this.addList(doc, data.hobbies, y);
      y += (data.hobbies.length * 15) + 20;
    }
    
    // Certifications
    if (data.certifications) {
      if (y > 650) { doc.addPage(); y = 50; }
      this.addSection(doc, 'CERTIFICATIONS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.certifications, 50, y, { width: 500 });
      y += Math.ceil(doc.heightOfString(data.certifications, { width: 500 }) / 15) * 15 + 20;
    }
    
    // Awards
    if (data.awards) {
      if (y > 650) { doc.addPage(); y = 50; }
      this.addSection(doc, 'AWARDS & ACHIEVEMENTS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.awards, 50, y, { width: 500 });
      y += Math.ceil(doc.heightOfString(data.awards, { width: 500 }) / 15) * 15 + 20;
    }
    
    // References
    if (data.references) {
      if (y > 680) { doc.addPage(); y = 50; }
      this.addSection(doc, 'REFERENCES', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.references, 50, y, { width: 500 });
    }
  }

  // Template 2: Modern two-column layout with photo
  generateTemplate2(doc, data, style) {
    const leftCol = 50;
    const rightCol = 250;
    let leftY = 50;
    let rightY = 50;
    
    // Header
    doc.rect(0, 0, 612, 80).fill(style.primaryColor);
    
    // Photo in header
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 480, 10, { width: 60, height: 60, fit: [60, 60] });
        doc.rect(478, 8, 64, 64).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name, 50, 25, { width: 410 });
    let contactInfo = `${data.email} | ${data.phone}`;
    if (data.alternatePhone) contactInfo += ` | ${data.alternatePhone}`;
    doc.fontSize(10).text(contactInfo, 50, 55, { width: 410 });
    if (data.linkedIn || data.website) {
      let webInfo = '';\n      if (data.linkedIn) webInfo += data.linkedIn;
      if (data.website) webInfo += (webInfo ? ' | ' : '') + data.website;
      doc.fontSize(8).text(webInfo, 50, 68, { width: 410 });
    }
    
    // Left column - Personal info
    leftY = 100;
    doc.fillColor('#000000');
    
    this.addSectionSmall(doc, 'CONTACT', leftCol, leftY, style.secondaryColor);
    leftY += 20;
    doc.fontSize(9).text(data.email, leftCol, leftY);
    leftY += 12;
    doc.text(data.phone, leftCol, leftY);
    leftY += 12;
    if (data.alternatePhone) {
      doc.text(data.alternatePhone, leftCol, leftY);
      leftY += 12;
    }
    if (data.linkedIn) {
      doc.fontSize(8).text(data.linkedIn, leftCol, leftY, { width: 150 });
      leftY += 10;
    }
    if (data.website) {
      doc.fontSize(8).text(data.website, leftCol, leftY, { width: 150 });
      leftY += 10;
    }
    doc.fontSize(9).text(data.presentAddress, leftCol, leftY, { width: 150 });
    leftY += 30;
    
    this.addSectionSmall(doc, 'PERSONAL', leftCol, leftY, style.secondaryColor);
    leftY += 20;
    doc.fontSize(9).text(`Age: ${data.age}`, leftCol, leftY);
    leftY += 12;
    doc.text(`Gender: ${data.gender}`, leftCol, leftY);
    leftY += 12;
    doc.text(`Status: ${data.maritalStatus}`, leftCol, leftY);
    leftY += 12;
    if (data.nid) {
      doc.text(`NID: ${data.nid}`, leftCol, leftY);
      leftY += 12;
    }
    if (data.passport) {
      doc.text(`Passport: ${data.passport}`, leftCol, leftY);
      leftY += 12;
    }
    if (data.religion) {
      doc.text(`Religion: ${data.religion}`, leftCol, leftY);
      leftY += 12;
    }
    leftY += 18;
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      this.addSectionSmall(doc, 'SKILLS', leftCol, leftY, style.secondaryColor);
      leftY += 20;
      data.skills.forEach(skill => {
        doc.fontSize(9).text(`• ${skill}`, leftCol, leftY, { width: 150 });
        leftY += 12;
      });
      leftY += 20;
    }
    
    // Languages
    if (data.languages && data.languages.length > 0) {
      this.addSectionSmall(doc, 'LANGUAGES', leftCol, leftY, style.secondaryColor);
      leftY += 20;
      data.languages.forEach(lang => {
        doc.fontSize(9).text(`• ${lang}`, leftCol, leftY);
        leftY += 12;
      });
    }
    
    // Right column - Education & Experience
    rightY = 100;
    
    // Objective
    if (data.objective) {
      this.addSectionSmall(doc, 'OBJECTIVE', rightCol, rightY, style.primaryColor);
      rightY += 20;
      doc.fontSize(9).text(data.objective, rightCol, rightY, { width: 310, align: 'justify' });
      rightY += Math.ceil(doc.heightOfString(data.objective, { width: 310 }) / 12) * 12 + 20;
    }
    
    this.addSectionSmall(doc, 'EDUCATION', rightCol, rightY, style.primaryColor);
    rightY += 20;
    this.addEducationCompact(doc, data.education, rightCol, rightY);
    rightY += 90;
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSectionSmall(doc, 'EXPERIENCE', rightCol, rightY, style.primaryColor);
      rightY += 20;
      
      if (data.currentJob) {
        this.addJobCompact(doc, data.currentJob, rightCol, rightY, true);
        rightY += 50;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (rightY > 700) {
            doc.addPage();
            rightY = 50;
          }
          this.addJobCompact(doc, job, rightCol, rightY, false);
          rightY += 50;
        });
      }
    }
    
    // Certifications
    if (data.certifications) {
      if (rightY > 650) { doc.addPage(); rightY = 50; }
      this.addSectionSmall(doc, 'CERTIFICATIONS', rightCol, rightY, style.primaryColor);
      rightY += 20;
      doc.fontSize(9).text(data.certifications, rightCol, rightY, { width: 310 });
      rightY += Math.ceil(doc.heightOfString(data.certifications, { width: 310 }) / 12) * 12 + 20;
    }
    
    // Awards
    if (data.awards) {
      if (rightY > 650) { doc.addPage(); rightY = 50; }
      this.addSectionSmall(doc, 'AWARDS', rightCol, rightY, style.primaryColor);
      rightY += 20;
      doc.fontSize(9).text(data.awards, rightCol, rightY, { width: 310 });
      rightY += Math.ceil(doc.heightOfString(data.awards, { width: 310 }) / 12) * 12 + 20;
    }
    
    // References
    if (data.references) {
      if (rightY > 680) { doc.addPage(); rightY = 50; }
      this.addSectionSmall(doc, 'REFERENCES', rightCol, rightY, style.primaryColor);
      rightY += 20;
      doc.fontSize(9).text(data.references, rightCol, rightY, { width: 310 });
    }
  }

  // Template 3: Creative with sidebar and photo
  generateTemplate3(doc, data, style) {
    // Sidebar
    doc.rect(0, 0, 200, 842).fill(style.primaryColor);
    
    // Name in sidebar
    doc.fillColor('#FFFFFF')
       .fontSize(20)
       .font('Helvetica-Bold')
       .text(data.name, 20, 40, { width: 160, align: 'center' });
    
    let sideY = 100;
    
    // Photo in sidebar
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 50, sideY, { width: 100, height: 100, fit: [100, 100] });
        doc.circle(100, sideY + 50, 52).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    sideY += 120;
    
    // Contact in sidebar
    doc.fontSize(12).font('Helvetica-Bold').text('CONTACT', 20, sideY);
    sideY += 20;
    doc.fontSize(9).font('Helvetica').text(data.email, 20, sideY, { width: 160 });
    sideY += 15;
    doc.text(data.phone, 20, sideY);
    sideY += 30;
    
    // Skills in sidebar
    if (data.skills && data.skills.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').text('SKILLS', 20, sideY);
      sideY += 20;
      data.skills.forEach(skill => {
        doc.fontSize(9).font('Helvetica').text(`• ${skill}`, 20, sideY, { width: 160 });
        sideY += 12;
      });
      sideY += 20;
    }
    
    // Languages in sidebar
    if (data.languages && data.languages.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').text('LANGUAGES', 20, sideY);
      sideY += 20;
      data.languages.forEach(lang => {
        doc.fontSize(9).font('Helvetica').text(`• ${lang}`, 20, sideY);
        sideY += 12;
      });
    }
    
    // Main content area
    let mainY = 50;
    const mainX = 220;
    doc.fillColor('#000000');
    
    // Objective
    if (data.objective) {
      this.addSectionMain(doc, 'CAREER OBJECTIVE', mainX, mainY, style.secondaryColor);
      mainY += 25;
      doc.fontSize(9).text(data.objective, mainX, mainY, { width: 330, align: 'justify' });
      mainY += Math.ceil(doc.heightOfString(data.objective, { width: 330 }) / 12) * 12 + 20;
    }
    
    // Summary
    if (data.summary) {
      this.addSectionMain(doc, 'PROFESSIONAL SUMMARY', mainX, mainY, style.secondaryColor);
      mainY += 25;
      doc.fontSize(9).text(data.summary, mainX, mainY, { width: 330, align: 'justify' });
      mainY += Math.ceil(doc.heightOfString(data.summary, { width: 330 }) / 12) * 12 + 20;
    }
    
    // Personal Info
    this.addSectionMain(doc, 'PERSONAL INFORMATION', mainX, mainY, style.secondaryColor);
    mainY += 25;
    doc.fontSize(10).text(`Age: ${data.age} | Gender: ${data.gender} | ${data.maritalStatus}`, mainX, mainY);
    mainY += 15;
    doc.text(`Nationality: ${data.nationality}`, mainX, mainY);
    mainY += 15;
    doc.text(`DOB: ${data.dateOfBirth}`, mainX, mainY);
    mainY += 15;
    if (data.nid) {
      doc.text(`NID: ${data.nid}`, mainX, mainY);
      mainY += 15;
    }
    if (data.passport) {
      doc.text(`Passport: ${data.passport}`, mainX, mainY);
      mainY += 15;
    }
    if (data.religion) {
      doc.text(`Religion: ${data.religion}`, mainX, mainY);
      mainY += 15;
    }
    mainY += 15;
    
    // Education
    this.addSectionMain(doc, 'EDUCATION', mainX, mainY, style.secondaryColor);
    mainY += 25;
    this.addEducationCompact(doc, data.education, mainX, mainY);
    mainY += 90;
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSectionMain(doc, 'WORK EXPERIENCE', mainX, mainY, style.secondaryColor);
      mainY += 25;
      
      if (data.currentJob) {
        this.addJobCompact(doc, data.currentJob, mainX, mainY, true);
        mainY += 35;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (mainY > 700) {
            doc.addPage();
            doc.rect(0, 0, 200, 842).fill(style.primaryColor);
            mainY = 50;
          }
          this.addJobCompact(doc, job, mainX, mainY, false);
          mainY += 35;
        });
      }
    }
    
    // Certifications
    if (data.certifications) {
      if (mainY > 650) { doc.addPage(); doc.rect(0, 0, 200, 842).fill(style.primaryColor); mainY = 50; }
      this.addSectionMain(doc, 'CERTIFICATIONS', mainX, mainY, style.secondaryColor);
      mainY += 25;
      doc.fontSize(9).text(data.certifications, mainX, mainY, { width: 330 });
      mainY += Math.ceil(doc.heightOfString(data.certifications, { width: 330 }) / 12) * 12 + 20;
    }
    
    // Awards
    if (data.awards) {
      if (mainY > 650) { doc.addPage(); doc.rect(0, 0, 200, 842).fill(style.primaryColor); mainY = 50; }
      this.addSectionMain(doc, 'AWARDS', mainX, mainY, style.secondaryColor);
      mainY += 25;
      doc.fontSize(9).text(data.awards, mainX, mainY, { width: 330 });
      mainY += Math.ceil(doc.heightOfString(data.awards, { width: 330 }) / 12) * 12 + 20;
    }
    
    // References
    if (data.references) {
      if (mainY > 680) { doc.addPage(); doc.rect(0, 0, 200, 842).fill(style.primaryColor); mainY = 50; }
      this.addSectionMain(doc, 'REFERENCES', mainX, mainY, style.secondaryColor);
      mainY += 25;
      doc.fontSize(9).text(data.references, mainX, mainY, { width: 330 });
    }
  }

  // Templates 4-10: Variations with different layouts
  generateTemplate4(doc, data, style) {
    // Minimalist design with photo
    let y = 60;
    
    // Photo centered at top
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 256, y, { width: 100, height: 100, fit: [100, 100] });
        doc.circle(306, y + 50, 52).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y += 120;
    
    // Name - large and centered
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 50, y, { align: 'center', width: 512 });
    
    y += 40;
    let contactLine = `${data.email} • ${data.phone}`;
    if (data.alternatePhone) contactLine += ` • ${data.alternatePhone}`;
    doc.fontSize(11)
       .fillColor('#666666')
       .text(contactLine, 50, y, { align: 'center', width: 512 });
    
    y += 25;
    if (data.linkedIn || data.website) {
      let webLine = '';
      if (data.linkedIn) webLine += data.linkedIn;
      if (data.website) webLine += (webLine ? ' • ' : '') + data.website;
      doc.fontSize(9).text(webLine, 50, y, { align: 'center', width: 512 });
      y += 15;
    }
    
    y += 15;
    doc.fillColor('#000000');
    
    // Thin line separator
    doc.moveTo(150, y).lineTo(462, y).stroke(style.primaryColor);
    y += 30;
    
    // Objective
    if (data.objective) {
      this.addSectionMinimal(doc, 'Career Objective', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.objective, 70, y, { width: 480, align: 'justify' });
      y += Math.ceil(doc.heightOfString(data.objective, { width: 480 }) / 15) * 15 + 20;
    }
    
    // Summary
    if (data.summary) {
      this.addSectionMinimal(doc, 'Professional Summary', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.summary, 70, y, { width: 480, align: 'justify' });
      y += Math.ceil(doc.heightOfString(data.summary, { width: 480 }) / 15) * 15 + 20;
    }
    
    // Personal Info
    this.addSectionMinimal(doc, 'Personal Information', y, style.primaryColor);
    y += 25;
    let personalInfo = `Age: ${data.age} • Gender: ${data.gender} • ${data.maritalStatus} • ${data.nationality}`;
    if (data.nid) personalInfo += ` • NID: ${data.nid}`;
    if (data.passport) personalInfo += ` • Passport: ${data.passport}`;
    if (data.religion) personalInfo += ` • Religion: ${data.religion}`;
    doc.fontSize(10).text(personalInfo, 70, y, { width: 480 });
    y += 30;
    
    // Education with bullet points
    this.addSectionMinimal(doc, 'Education', y, style.primaryColor);
    y += 25;
    this.addEducationBullet(doc, data.education, y);
    y += 90;
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSectionMinimal(doc, 'Experience', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJobBullet(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJobBullet(doc, job, y, false);
          y += 40;
        });
      }
    }
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSectionMinimal(doc, 'Skills', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 40;
    }
    
    // Certifications
    if (data.certifications) {
      if (y > 650) { doc.addPage(); y = 50; }
      this.addSectionMinimal(doc, 'Certifications', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.certifications, 70, y, { width: 480 });
      y += Math.ceil(doc.heightOfString(data.certifications, { width: 480 }) / 15) * 15 + 20;
    }
    
    // Awards
    if (data.awards) {
      if (y > 650) { doc.addPage(); y = 50; }
      this.addSectionMinimal(doc, 'Awards & Achievements', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.awards, 70, y, { width: 480 });
      y += Math.ceil(doc.heightOfString(data.awards, { width: 480 }) / 15) * 15 + 20;
    }
    
    // References
    if (data.references) {
      if (y > 680) { doc.addPage(); y = 50; }
      this.addSectionMinimal(doc, 'References', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.references, 70, y, { width: 480 });
    }
  }

  generateTemplate5(doc, data, style) {
    // Elegant design with photo on left
    let y = 50;
    
    // Photo on left side
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 50, y, { width: 90, height: 90, fit: [90, 90] });
        doc.roundedRect(48, y - 2, 94, 94, 8).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    // Name and info next to photo
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 160, y + 10);
    doc.fontSize(11)
       .fillColor('#000000')
       .text(data.email, 160, y + 45);
    doc.text(data.phone, 160, y + 62);
    
    y += 110;
    
    // Horizontal line
    doc.moveTo(50, y).lineTo(562, y).stroke(style.secondaryColor);
    y += 20;
    
    // Personal info
    this.addSection(doc, 'PERSONAL INFORMATION', y, style.primaryColor);
    y += 25;
    doc.fontSize(10).text(`DOB: ${data.dateOfBirth} | Age: ${data.age} | Gender: ${data.gender} | Status: ${data.maritalStatus}`, 50, y);
    y += 15;
    doc.text(`Nationality: ${data.nationality}`, 50, y);
    y += 30;
    
    // Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Skills & Experience
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 35;
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'WORK EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
    }
  }

  generateTemplate6(doc, data, style) {
    // Clean modern layout with top photo
    let y = 40;
    
    // Top banner
    doc.rect(0, 0, 612, 3).fill(style.primaryColor);
    
    y = 30;
    
    // Centered photo
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 256, y, { width: 100, height: 100, fit: [100, 100] });
        doc.rect(254, y - 2, 104, 104).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y += 120;
    
    // Name centered
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 50, y, { align: 'center', width: 512 });
    
    y += 35;
    doc.fontSize(10)
       .fillColor('#000000')
       .text(`${data.email} • ${data.phone}`, 50, y, { align: 'center', width: 512 });
    
    y += 30;
    
    // Grid info
    doc.fontSize(9).text(`Age: ${data.age}`, 100, y);
    doc.text(`Gender: ${data.gender}`, 250, y);
    doc.text(`Status: ${data.maritalStatus}`, 400, y);
    y += 30;
    
    // Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 35;
    }
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'EXPERIENCE', y, style.primaryColor);
      y += 25;
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
      }
    }
  }

  generateTemplate7(doc, data, style) {
    // Minimal gray theme with corner photo
    let y = 50;
    
    // Photo in top left corner
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 50, y, { width: 80, height: 80, fit: [80, 80] });
        doc.circle(90, y + 40, 42).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    // Name and contact
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 150, y + 15);
    doc.fontSize(10)
       .fillColor('#000000')
       .text(`${data.email} | ${data.phone}`, 150, y + 50);
    
    y += 100;
    
    // Simple sections
    this.addSectionMinimal(doc, 'Personal Information', y, style.primaryColor);
    y += 25;
    doc.fontSize(10).text(`${data.age} years • ${data.gender} • ${data.maritalStatus} • ${data.nationality}`, 50, y);
    y += 30;
    
    this.addSectionMinimal(doc, 'Education', y, style.primaryColor);
    y += 25;
    this.addEducationBullet(doc, data.education, y);
    y += 65;
    
    if (data.skills && data.skills.length > 0) {
      this.addSectionMinimal(doc, 'Skills', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
    }
  }

  generateTemplate8(doc, data, style) {
    // Warm timeline style with right-aligned photo
    let y = 50;
    
    // Header bar
    doc.rect(0, 0, 612, 5).fill(style.primaryColor);
    
    y = 30;
    
    // Name on left, photo on right
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 50, y);
    
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 470, y - 10, { width: 90, height: 90, fit: [90, 90] });
        doc.roundedRect(468, y - 12, 94, 94, 5).stroke(style.secondaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y += 35;
    doc.fontSize(11)
       .fillColor('#000000')
       .text(data.email, 50, y);
    y += 18;
    doc.text(data.phone, 50, y);
    y += 18;
    doc.fontSize(9).text(data.presentAddress, 50, y, { width: 400 });
    
    y += 40;
    
    // Timeline sections
    this.addSection(doc, 'EDUCATION TIMELINE', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'PROFESSIONAL SKILLS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 35;
    }
    
    if (data.currentJob) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'CAREER TIMELINE', y, style.primaryColor);
      y += 25;
      this.addJob(doc, data.currentJob, y, true);
    }
  }

  generateTemplate9(doc, data, style) {
    // Fresh box style with centered elements
    let y = 40;
    
    // Photo centered with border
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 236, y, { width: 140, height: 140, fit: [140, 140] });
        doc.rect(230, y - 6, 152, 152).lineWidth(3).stroke(style.primaryColor);
        doc.rect(234, y - 2, 144, 144).lineWidth(1).stroke(style.secondaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y += 170;
    
    // Name in box
    doc.rect(50, y, 512, 60).stroke(style.primaryColor);
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 70, y + 12, { align: 'center', width: 472 });
    doc.fontSize(10)
       .fillColor('#000000')
       .text(`${data.email} | ${data.phone}`, 70, y + 42, { align: 'center', width: 472 });
    
    y += 80;
    
    // Info boxes
    doc.rect(50, y, 250, 50).stroke(style.secondaryColor);
    doc.fontSize(9).text(`Age: ${data.age} | Gender: ${data.gender}`, 60, y + 10);
    doc.text(`Status: ${data.maritalStatus}`, 60, y + 25);
    doc.text(`Nationality: ${data.nationality}`, 60, y + 35);
    
    doc.rect(312, y, 250, 50).stroke(style.secondaryColor);
    doc.text(`Address:`, 322, y + 10);
    doc.text(data.presentAddress, 322, y + 22, { width: 230 });
    
    y += 70;
    
    // Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
    }
  }

  generateTemplate10(doc, data, style) {
    // Classic blue format with traditional photo placement
    let y = 50;
    
    // Traditional header
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 50, y, { align: 'center', width: 512 });
    
    y += 40;
    
    // Photo centered below name
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 256, y, { width: 100, height: 100, fit: [100, 100] });
        doc.rect(254, y - 2, 104, 104).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y += 120;
    
    // Contact centered
    doc.fontSize(10)
       .fillColor('#000000')
       .text(`${data.email} | ${data.phone}`, 50, y, { align: 'center', width: 512 });
    
    y += 20;
    doc.fontSize(9)
       .text(data.presentAddress, 50, y, { align: 'center', width: 512 });
    
    y += 35;
    
    // Classic sections
    this.addSection(doc, 'PERSONAL DETAILS', y, style.primaryColor);
    y += 25;
    doc.fontSize(10).text(`Date of Birth: ${data.dateOfBirth} | Age: ${data.age} | Gender: ${data.gender}`, 50, y);
    y += 15;
    doc.text(`Marital Status: ${data.maritalStatus} | Nationality: ${data.nationality}`, 50, y);
    y += 30;
    
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 35;
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'WORK EXPERIENCE', y, style.primaryColor);
      y += 25;
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
      }
    }
  }

  // Template 11: Vibrant header with photo
  generateTemplate11(doc, data, style) {
    let y = 50;
    
    // Large vibrant header
    doc.rect(0, 0, 612, 140).fill(style.primaryColor);
    
    // Add photo in header (right side)
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 450, 20, { width: 100, height: 100, fit: [100, 100] });
        doc.roundedRect(450, 20, 100, 100, 5).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    // Name and contact in header
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 50, 45, { width: 380 });
    doc.fontSize(11)
       .text(`${data.email} | ${data.phone}`, 50, 85);
    doc.fontSize(10)
       .text(`${data.presentAddress}`, 50, 105);
    
    y = 160;
    doc.fillColor('#000000');
    
    // Two column layout
    const leftX = 50;
    const rightX = 320;
    
    // Left column - Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    
    // Right column - Personal Info
    let rightY = 160;
    this.addSection(doc, 'PERSONAL INFO', rightY, style.secondaryColor);
    rightY += 25;
    doc.fontSize(10).text(`DOB: ${data.dateOfBirth}`, rightX, rightY);
    rightY += 15;
    doc.text(`Age: ${data.age} | Gender: ${data.gender}`, rightX, rightY);
    rightY += 15;
    doc.text(`Status: ${data.maritalStatus}`, rightX, rightY);
    rightY += 15;
    doc.text(`Nationality: ${data.nationality}`, rightX, rightY);
    
    y += 110;
    
    // Skills section
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 30;
    }
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'WORK EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJob(doc, job, y, false);
          y += 40;
        });
      }
    }
  }

  // Template 12: Corporate style with centered photo
  generateTemplate12(doc, data, style) {
    let y = 50;
    
    // Photo at top center
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 256, 40, { width: 100, height: 100, fit: [100, 100] });
        doc.circle(306, 90, 52).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y = 160;
    
    // Centered name
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 50, y, { align: 'center', width: 512 });
    
    y += 35;
    doc.fontSize(11)
       .fillColor('#000000')
       .text(`${data.email} | ${data.phone}`, 50, y, { align: 'center', width: 512 });
    
    y += 40;
    
    // Professional summary box
    doc.rect(50, y, 512, 60).stroke(style.primaryColor);
    y += 15;
    doc.fontSize(10)
       .text(`${data.age} years | ${data.gender} | ${data.maritalStatus} | ${data.nationality}`, 70, y, { width: 472 });
    y += 15;
    doc.text(`Address: ${data.presentAddress}`, 70, y, { width: 472 });
    
    y += 45;
    
    // Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Experience & Skills in columns
    const leftX = 50;
    const rightX = 320;
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSection(doc, 'EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
    }
    
    if (data.skills && data.skills.length > 0) {
      let skillY = y - 65;
      doc.fontSize(style.fontSize.section)
         .font('Helvetica-Bold')
         .fillColor(style.primaryColor)
         .text('SKILLS', rightX, skillY);
      skillY += 20;
      data.skills.forEach(skill => {
        doc.fontSize(9).fillColor('#000000').text(`• ${skill}`, rightX, skillY, { width: 230 });
        skillY += 12;
      });
    }
  }

  // Template 13: Executive bold design
  generateTemplate13(doc, data, style) {
    let y = 40;
    
    // Bold name bar
    doc.rect(0, 30, 612, 50).fill(style.primaryColor);
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 50, 48, { align: 'center', width: 512 });
    
    y = 100;
    
    // Photo and contact in box
    doc.rect(40, y, 532, 100).stroke(style.secondaryColor);
    
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 60, y + 10, { width: 80, height: 80, fit: [80, 80] });
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    doc.fontSize(11).fillColor('#000000').font('Helvetica-Bold').text('CONTACT', 160, y + 15);
    doc.fontSize(10).font('Helvetica').text(data.email, 160, y + 35);
    doc.text(data.phone, 160, y + 50);
    doc.text(data.presentAddress, 160, y + 65, { width: 250 });
    
    doc.fontSize(11).font('Helvetica-Bold').text('PERSONAL', 430, y + 15);
    doc.fontSize(9).font('Helvetica').text(`Age: ${data.age}`, 430, y + 35);
    doc.text(`${data.gender} | ${data.maritalStatus}`, 430, y + 50);
    doc.text(data.nationality, 430, y + 65);
    
    y = 220;
    
    // Education
    this.addSection(doc, 'EDUCATIONAL BACKGROUND', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Professional Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSection(doc, 'PROFESSIONAL EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJob(doc, job, y, false);
          y += 40;
        });
      }
    }
    
    // Skills & Languages
    if (y > 650) {
      doc.addPage();
      y = 50;
    }
    
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'CORE COMPETENCIES', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 30;
    }
  }

  // Template 14: Contemporary with sidebar photo
  generateTemplate14(doc, data, style) {
    // Left sidebar with gradient effect
    doc.rect(0, 0, 180, 842).fill(style.primaryColor);
    
    let sideY = 40;
    
    // Photo in sidebar
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 40, sideY, { width: 100, height: 100, fit: [100, 100] });
        doc.circle(90, sideY + 50, 52).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    sideY += 120;
    
    // Contact in sidebar
    doc.fillColor('#FFFFFF')
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('CONTACT', 20, sideY);
    sideY += 20;
    doc.fontSize(8).font('Helvetica').text(data.email, 20, sideY, { width: 140 });
    sideY += 15;
    doc.text(data.phone, 20, sideY);
    sideY += 30;
    
    // Personal details in sidebar
    doc.fontSize(12).font('Helvetica-Bold').text('DETAILS', 20, sideY);
    sideY += 20;
    doc.fontSize(8).font('Helvetica').text(`Age: ${data.age}`, 20, sideY);
    sideY += 12;
    doc.text(`Gender: ${data.gender}`, 20, sideY);
    sideY += 12;
    doc.text(`Status: ${data.maritalStatus}`, 20, sideY);
    sideY += 12;
    doc.text(`Nationality: ${data.nationality}`, 20, sideY);
    sideY += 25;
    
    // Skills in sidebar
    if (data.skills && data.skills.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').text('SKILLS', 20, sideY);
      sideY += 20;
      data.skills.forEach(skill => {
        doc.fontSize(8).font('Helvetica').text(`• ${skill}`, 20, sideY, { width: 140 });
        sideY += 12;
      });
    }
    
    // Main content
    let y = 50;
    const mainX = 200;
    
    doc.fillColor(style.primaryColor)
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), mainX, y);
    
    y += 40;
    doc.fontSize(10).fillColor('#000000').text(data.presentAddress, mainX, y, { width: 350 });
    
    y += 35;
    
    // Education
    this.addSectionMain(doc, 'EDUCATION', mainX, y, style.secondaryColor);
    y += 25;
    this.addEducationCompact(doc, data.education, mainX, y);
    y += 100;
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSectionMain(doc, 'EXPERIENCE', mainX, y, style.secondaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJobCompact(doc, data.currentJob, mainX, y, true);
        y += 45;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJobCompact(doc, job, mainX, y, false);
          y += 45;
        });
      }
    }
  }

  // Template 15: Artistic layout
  generateTemplate15(doc, data, style) {
    let y = 40;
    
    // Diagonal header design
    doc.save();
    doc.rect(0, 0, 612, 120).fill(style.primaryColor);
    
    // Photo with artistic border
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 50, 30, { width: 80, height: 80, fit: [80, 80] });
        doc.roundedRect(48, 28, 84, 84, 8).lineWidth(3).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 150, 45);
    doc.fontSize(10)
       .text(`${data.email} | ${data.phone}`, 150, 80);
    
    doc.restore();
    
    y = 140;
    doc.fillColor('#000000');
    
    // Info grid
    doc.fontSize(10);
    doc.text(`DOB: ${data.dateOfBirth}`, 50, y);
    doc.text(`Age: ${data.age}`, 200, y);
    doc.text(`Gender: ${data.gender}`, 300, y);
    doc.text(`Status: ${data.maritalStatus}`, 420, y);
    y += 15;
    doc.text(`Nationality: ${data.nationality}`, 50, y, { width: 250 });
    
    y += 40;
    
    // Education with colored boxes
    doc.fontSize(style.fontSize.section)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text('EDUCATION', 50, y);
    y += 30;
    
    doc.rect(50, y, 500, 25).fill(style.secondaryColor);
    doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica-Bold').text('Graduation', 60, y + 7);
    y += 30;
    doc.fillColor('#000000').fontSize(10).font('Helvetica')
       .text(`${data.education.graduation.subject} | CGPA: ${data.education.graduation.cgpa}`, 60, y);
    doc.text(data.education.graduation.institution, 60, y + 15);
    
    y += 40;
    doc.rect(50, y, 500, 25).fill(style.secondaryColor);
    doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica-Bold').text('HSC', 60, y + 7);
    y += 30;
    doc.fillColor('#000000').fontSize(10).font('Helvetica')
       .text(`GPA: ${data.education.hsc.gpa} | ${data.education.hsc.board} Board`, 60, y);
    doc.text(data.education.hsc.collegeName, 60, y + 15);
    
    y += 40;
    doc.rect(50, y, 500, 25).fill(style.secondaryColor);
    doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica-Bold').text('SSC', 60, y + 7);
    y += 30;
    doc.fillColor('#000000').fontSize(10).font('Helvetica')
       .text(`GPA: ${data.education.ssc.gpa} | ${data.education.ssc.board} Board`, 60, y);
    doc.text(data.education.ssc.schoolName, 60, y + 15);
    
    y += 45;
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      doc.fontSize(style.fontSize.section)
         .font('Helvetica-Bold')
         .fillColor(style.primaryColor)
         .text('SKILLS', 50, y);
      y += 25;
      doc.fontSize(10).fillColor('#000000').text(data.skills.join(' • '), 50, y, { width: 500 });
    }
  }

  // Template 16: Professional dark theme
  generateTemplate16(doc, data, style) {
    // Dark header
    doc.rect(0, 0, 612, 100).fill(style.primaryColor);
    
    // Photo in corner
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 480, 15, { width: 70, height: 70, fit: [70, 70] });
        doc.rect(478, 13, 74, 74).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 50, 35, { width: 410 });
    doc.fontSize(9)
       .text(`${data.email} • ${data.phone}`, 50, 70);
    
    let y = 120;
    doc.fillColor('#000000');
    
    // Profile section
    doc.fontSize(12).font('Helvetica-Bold').fillColor(style.primaryColor).text('PROFILE', 50, y);
    y += 20;
    doc.fontSize(10).fillColor('#000000').font('Helvetica')
       .text(`${data.age} years old ${data.gender}, ${data.maritalStatus}. ${data.nationality}. Currently residing at ${data.presentAddress}.`, 50, y, { width: 500 });
    
    y += 45;
    
    // Education
    doc.fontSize(12).font('Helvetica-Bold').fillColor(style.primaryColor).text('EDUCATION', 50, y);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Professional Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor(style.primaryColor).text('PROFESSIONAL EXPERIENCE', 50, y);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJob(doc, job, y, false);
          y += 40;
        });
      }
    }
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      doc.fontSize(12).font('Helvetica-Bold').fillColor(style.primaryColor).text('TECHNICAL SKILLS', 50, y);
      y += 25;
      doc.fontSize(10).fillColor('#000000').text(data.skills.join(' • '), 50, y, { width: 500 });
    }
  }

  // Template 17: Energetic orange theme with large photo
  generateTemplate17(doc, data, style) {
    let y = 40;
    
    // Top section with photo
    doc.rect(0, 0, 612, 160).fill(style.primaryColor);
    
    // Large centered photo
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 40, 30, { width: 110, height: 110, fit: [110, 110] });
        doc.circle(95, 85, 57).lineWidth(4).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 170, 50);
    doc.fontSize(11)
       .text(data.email, 170, 85);
    doc.text(data.phone, 170, 105);
    doc.fontSize(9)
       .text(`${data.age} yrs • ${data.gender} • ${data.maritalStatus} • ${data.nationality}`, 170, 125);
    
    y = 180;
    doc.fillColor('#000000');
    
    // Education
    this.addSection(doc, 'ACADEMIC CREDENTIALS', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSection(doc, 'WORK EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJob(doc, job, y, false);
          y += 40;
        });
      }
    }
    
    // Skills & Languages in boxes
    if (y > 650) {
      doc.addPage();
      y = 50;
    }
    
    if (data.skills && data.skills.length > 0) {
      doc.rect(45, y, 250, 80).stroke(style.primaryColor);
      doc.fontSize(12).font('Helvetica-Bold').fillColor(style.primaryColor).text('SKILLS', 60, y + 10);
      doc.fontSize(9).fillColor('#000000').font('Helvetica').text(data.skills.join(', '), 60, y + 30, { width: 220 });
    }
    
    if (data.languages && data.languages.length > 0) {
      doc.rect(310, y, 250, 80).stroke(style.primaryColor);
      doc.fontSize(12).font('Helvetica-Bold').fillColor(style.primaryColor).text('LANGUAGES', 325, y + 10);
      doc.fontSize(9).fillColor('#000000').font('Helvetica').text(data.languages.join(', '), 325, y + 30, { width: 220 });
    }
  }

  // Template 18: Nature green theme
  generateTemplate18(doc, data, style) {
    // Green gradient header
    doc.rect(0, 0, 612, 130).fill(style.primaryColor);
    
    let y = 30;
    
    // Name section
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 50, y, { align: 'center', width: 512 });
    
    y += 40;
    doc.fontSize(11)
       .text(`${data.email} | ${data.phone}`, 50, y, { align: 'center', width: 512 });
    
    y += 25;
    doc.fontSize(9)
       .text(data.presentAddress, 50, y, { align: 'center', width: 512 });
    
    // Photo below header
    y = 150;
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 256, y, { width: 100, height: 100, fit: [100, 100] });
        doc.roundedRect(254, y - 2, 104, 104, 10).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y = 270;
    doc.fillColor('#000000');
    
    // Personal info bar
    doc.rect(50, y, 512, 30).fill(style.secondaryColor);
    doc.fillColor('#FFFFFF').fontSize(9)
       .text(`Age: ${data.age} | Gender: ${data.gender} | Status: ${data.maritalStatus} | Nationality: ${data.nationality}`, 60, y + 10, { width: 492 });
    
    y += 50;
    doc.fillColor('#000000');
    
    // Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS & COMPETENCIES', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).text(data.skills.join(' • '), 50, y, { width: 500 });
      y += 35;
    }
    
    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'PROFESSIONAL EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
    }
  }

  // Template 19: Luxury purple theme
  generateTemplate19(doc, data, style) {
    // Elegant header with border
    doc.rect(30, 30, 552, 120).stroke(style.primaryColor);
    doc.rect(35, 35, 542, 110).stroke(style.secondaryColor);
    
    let y = 50;
    
    // Photo in elegant frame
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 250, 55, { width: 90, height: 90, fit: [90, 90] });
        doc.circle(295, 100, 47).stroke(style.primaryColor);
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    y = 160;
    
    // Name centered below
    doc.fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .fillColor(style.primaryColor)
       .text(data.name.toUpperCase(), 50, y, { align: 'center', width: 512 });
    
    y += 35;
    doc.fontSize(10)
       .fillColor('#000000')
       .text(`${data.email} • ${data.phone}`, 50, y, { align: 'center', width: 512 });
    
    y += 20;
    doc.fontSize(9)
       .text(`${data.presentAddress}`, 50, y, { align: 'center', width: 512 });
    
    y += 35;
    
    // Personal details in elegant box
    doc.rect(50, y, 512, 40).fill('#F8F9F9');
    doc.fillColor('#000000').fontSize(9)
       .text(`Date of Birth: ${data.dateOfBirth} | Age: ${data.age} | Gender: ${data.gender}`, 70, y + 10, { width: 472 });
    doc.text(`Marital Status: ${data.maritalStatus} | Nationality: ${data.nationality}`, 70, y + 25, { width: 472 });
    
    y += 60;
    
    // Education
    this.addSection(doc, 'EDUCATION', y, style.primaryColor);
    y += 25;
    this.addEducation(doc, data.education, y);
    y += 95;
    
    // Professional Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      this.addSection(doc, 'PROFESSIONAL EXPERIENCE', y, style.primaryColor);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJob(doc, job, y, false);
          y += 40;
        });
      }
    }
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      if (y > 650) {
        doc.addPage();
        y = 50;
      }
      this.addSection(doc, 'KEY SKILLS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).fillColor('#000000').text(data.skills.join(' • '), 50, y, { width: 500 });
    }
  }

  // Template 20: Ocean blue theme with split layout
  generateTemplate20(doc, data, style) {
    // Ocean wave header
    doc.rect(0, 0, 612, 100).fill(style.primaryColor);
    doc.rect(0, 90, 612, 20).fill(style.secondaryColor);
    
    // Photo in header
    if (data.photo && fs.existsSync(path.join(__dirname, '..', data.photo))) {
      try {
        doc.image(path.join(__dirname, '..', data.photo), 470, 20, { width: 90, height: 90, fit: [90, 90] });
        doc.circle(515, 65, 47).stroke('#FFFFFF');
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }
    
    doc.fillColor('#FFFFFF')
       .fontSize(style.fontSize.title)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), 50, 30, { width: 400 });
    doc.fontSize(10)
       .text(`${data.email} | ${data.phone}`, 50, 70);
    
    let y = 130;
    doc.fillColor('#000000');
    
    // Split layout
    const leftX = 50;
    const rightX = 320;
    let leftY = y;
    let rightY = y;
    
    // Left side - Education
    doc.fontSize(13).font('Helvetica-Bold').fillColor(style.primaryColor).text('EDUCATION', leftX, leftY);
    leftY += 25;
    this.addEducationCompact(doc, data.education, leftX, leftY);
    leftY += 110;
    
    // Right side - Personal
    doc.fontSize(13).font('Helvetica-Bold').fillColor(style.primaryColor).text('PERSONAL INFO', rightX, rightY);
    rightY += 25;
    doc.fontSize(10).fillColor('#000000').font('Helvetica').text(`DOB: ${data.dateOfBirth}`, rightX, rightY);
    rightY += 15;
    doc.text(`Age: ${data.age}`, rightX, rightY);
    rightY += 15;
    doc.text(`Gender: ${data.gender}`, rightX, rightY);
    rightY += 15;
    doc.text(`Status: ${data.maritalStatus}`, rightX, rightY);
    rightY += 15;
    doc.text(`Nationality: ${data.nationality}`, rightX, rightY);
    rightY += 15;
    doc.fontSize(9).text(data.presentAddress, rightX, rightY, { width: 230 });
    
    // Skills below
    y = leftY + 20;
    if (data.skills && data.skills.length > 0) {
      doc.fontSize(13).font('Helvetica-Bold').fillColor(style.primaryColor).text('SKILLS', leftX, y);
      y += 25;
      doc.fontSize(10).fillColor('#000000').font('Helvetica').text(data.skills.join(' • '), leftX, y, { width: 500 });
      y += 40;
    }
    
    // Experience full width
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      doc.fontSize(13).font('Helvetica-Bold').fillColor(style.primaryColor).text('WORK EXPERIENCE', leftX, y);
      y += 25;
      
      if (data.currentJob) {
        this.addJob(doc, data.currentJob, y, true);
        y += 40;
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }
          this.addJob(doc, job, y, false);
          y += 40;
        });
      }
    }
  }

  // Helper methods
  addSection(doc, title, y, color) {
    doc.fontSize(14)
       .font('Helvetica-Bold')
       .fillColor(color)
       .text(title, 50, y);
    doc.moveTo(50, y + 18).lineTo(550, y + 18).stroke(color);
  }

  // Helper method to add professional photo with frame
  addPhotoWithFrame(doc, photoPath, x, y, size, frameStyle, color) {
    if (!photoPath || !fs.existsSync(path.join(__dirname, '..', photoPath))) {
      return;
    }

    try {
      const fullPath = path.join(__dirname, '..', photoPath);
      
      // Different frame styles
      switch(frameStyle) {
        case 'double-border':
          // Outer border
          doc.lineWidth(3);
          doc.rect(x - 3, y - 3, size + 6, size + 6).stroke(color);
          // Inner border
          doc.lineWidth(1);
          doc.rect(x - 1, y - 1, size + 2, size + 2).stroke('#FFFFFF');
          break;
          
        case 'shadow':
          // Shadow effect
          doc.rect(x + 3, y + 3, size, size).fill('#CCCCCC');
          // Border
          doc.lineWidth(2);
          doc.rect(x, y, size, size).stroke(color);
          break;
          
        case 'circular-double':
          const radius = size / 2;
          const centerX = x + radius;
          const centerY = y + radius;
          // Outer circle
          doc.lineWidth(3);
          doc.circle(centerX, centerY, radius + 3).stroke(color);
          // Inner circle
          doc.lineWidth(1);
          doc.circle(centerX, centerY, radius + 1).stroke('#FFFFFF');
          break;
          
        case 'rounded':
          // Rounded rectangle with border
          doc.lineWidth(2);
          doc.roundedRect(x - 2, y - 2, size + 4, size + 4, 8).stroke(color);
          break;
          
        default:
          // Simple border
          doc.lineWidth(2);
          doc.rect(x - 1, y - 1, size + 2, size + 2).stroke(color);
      }
      
      // Add the photo
      doc.image(fullPath, x, y, { width: size, height: size, fit: [size, size] });
      
    } catch (error) {
      console.error('Error adding photo with frame:', error);
    }
  }

  addSectionSmall(doc, title, x, y, color) {
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .fillColor(color)
       .text(title, x, y);
    doc.moveTo(x, y + 15).lineTo(x + 150, y + 15).stroke(color);
  }

  // Helper to add all optional new fields
  addNewFieldsSections(doc, data, y, style, width = 500) {
    // Certifications
    if (data.certifications) {
      if (y > 650) { doc.addPage(); y = 50; }
      this.addSection(doc, 'CERTIFICATIONS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.certifications, 50, y, { width: width });
      y += Math.ceil(doc.heightOfString(data.certifications, { width: width }) / 15) * 15 + 20;
    }
    
    // Awards
    if (data.awards) {
      if (y > 650) { doc.addPage(); y = 50; }
      this.addSection(doc, 'AWARDS & ACHIEVEMENTS', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.awards, 50, y, { width: width });
      y += Math.ceil(doc.heightOfString(data.awards, { width: width }) / 15) * 15 + 20;
    }
    
    // References
    if (data.references) {
      if (y > 680) { doc.addPage(); y = 50; }
      this.addSection(doc, 'REFERENCES', y, style.primaryColor);
      y += 25;
      doc.fontSize(10).font('Helvetica').text(data.references, 50, y, { width: width });
    }
    return y;
  }

  addSectionMain(doc, title, x, y, color) {
    doc.fontSize(13)
       .font('Helvetica-Bold')
       .fillColor(color)
       .text(title, x, y);
    doc.moveTo(x, y + 17).lineTo(x + 330, y + 17).stroke(color);
  }

  addSectionMinimal(doc, title, y, color) {
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor(color)
       .text(title, 50, y);
  }

  addKeyValue(doc, key, value, y) {
    doc.fontSize(10)
       .font('Helvetica-Bold')
       .fillColor('#000000')
       .text(`${key}:`, 50, y);
    doc.font('Helvetica')
       .text(value || 'N/A', 200, y, { width: 350 });
  }

  addEducation(doc, education, y) {
    const startY = y;
    
    // SSC
    doc.fontSize(11).font('Helvetica-Bold').text('SSC', 50, y);
    let sscInfo = `GPA: ${education.ssc.gpa}`;
    if (education.ssc.group) sscInfo += ` | ${education.ssc.group}`;
    sscInfo += ` | ${education.ssc.board} Board`;
    if (education.ssc.year) sscInfo += ` | ${education.ssc.year}`;
    doc.fontSize(10).font('Helvetica').text(sscInfo, 150, y);
    y += 12;
    doc.text(education.ssc.schoolName, 150, y);
    
    y += 20;
    
    // HSC
    doc.fontSize(11).font('Helvetica-Bold').text('HSC', 50, y);
    let hscInfo = `GPA: ${education.hsc.gpa}`;
    if (education.hsc.group) hscInfo += ` | ${education.hsc.group}`;
    hscInfo += ` | ${education.hsc.board} Board`;
    if (education.hsc.year) hscInfo += ` | ${education.hsc.year}`;
    doc.fontSize(10).font('Helvetica').text(hscInfo, 150, y);
    y += 12;
    doc.text(education.hsc.collegeName, 150, y);
    
    y += 20;
    
    // Graduation
    doc.fontSize(11).font('Helvetica-Bold').text('Graduation', 50, y);
    let gradInfo = '';
    if (education.graduation.degree) gradInfo += `${education.graduation.degree} in `;
    gradInfo += education.graduation.subject;
    gradInfo += ` | CGPA: ${education.graduation.cgpa}`;
    if (education.graduation.year) gradInfo += ` | ${education.graduation.year}`;
    doc.fontSize(10).font('Helvetica').text(gradInfo, 150, y);
    y += 12;
    doc.text(education.graduation.institution, 150, y);
  }

  addEducationCompact(doc, education, x, y) {
    doc.fontSize(10).font('Helvetica-Bold')
       .fillColor('#000000')
       .text('Graduation', x, y);
    y += 12;
    let gradInfo = '';
    if (education.graduation.degree) gradInfo += `${education.graduation.degree} - `;
    gradInfo += `${education.graduation.subject} - CGPA: ${education.graduation.cgpa}`;
    doc.font('Helvetica').text(gradInfo, x, y);
    y += 10;
    doc.fontSize(9).text(education.graduation.institution, x, y);
    y += 15;
    
    doc.fontSize(10).font('Helvetica-Bold').text('HSC', x, y);
    y += 12;
    doc.font('Helvetica').text(`GPA: ${education.hsc.gpa} - ${education.hsc.board} Board`, x, y);
    y += 10;
    doc.fontSize(9).text(education.hsc.collegeName, x, y);
    y += 15;
    
    doc.fontSize(10).font('Helvetica-Bold').text('SSC', x, y);
    y += 12;
    doc.font('Helvetica').text(`GPA: ${education.ssc.gpa} - ${education.ssc.board} Board`, x, y);
    y += 10;
    doc.fontSize(9).text(education.ssc.schoolName, x, y);
  }

  addEducationBullet(doc, education, y) {
    doc.fontSize(10).font('Helvetica')
       .text(`• ${education.graduation.subject}, CGPA: ${education.graduation.cgpa} - ${education.graduation.institution}`, 70, y, { width: 480 });
    y += 15;
    doc.text(`• HSC, GPA: ${education.hsc.gpa}, ${education.hsc.board} Board - ${education.hsc.collegeName}`, 70, y, { width: 480 });
    y += 15;
    doc.text(`• SSC, GPA: ${education.ssc.gpa}, ${education.ssc.board} Board - ${education.ssc.schoolName}`, 70, y, { width: 480 });
  }

  addJob(doc, job, y, isCurrent) {
    doc.fontSize(11).font('Helvetica-Bold')
       .text(job.title || job.jobTitle, 50, y);
    let jobInfo = job.company || job.jobCompany;
    if (job.location) jobInfo += `, ${job.location}`;
    jobInfo += ` | ${job.duration || job.jobDuration}${isCurrent ? ' (Current)' : ''}`;
    doc.fontSize(10).font('Helvetica').text(jobInfo, 50, y + 15);
    if (job.responsibilities) {
      y += 30;
      doc.fontSize(9).text(job.responsibilities, 50, y, { width: 500 });
    }
  }

  addJobCompact(doc, job, x, y, isCurrent) {
    doc.fontSize(10).font('Helvetica-Bold')
       .fillColor('#000000')
       .text(job.title || job.jobTitle, x, y);
    y += 12;
    let jobInfo = job.company || job.jobCompany;
    if (job.location) jobInfo += `, ${job.location}`;
    doc.font('Helvetica').fontSize(9).text(jobInfo, x, y);
    y += 12;
    doc.font('Helvetica').text(`${job.company || job.jobCompany}`, x, y);
    y += 10;
    doc.fontSize(9).text(`${job.duration || job.jobDuration}${isCurrent ? ' (Current)' : ''}`, x, y);
  }

  addJobBullet(doc, job, y, isCurrent) {
    doc.fontSize(10).font('Helvetica')
       .text(`• ${job.title || job.jobTitle} at ${job.company || job.jobCompany} (${job.duration || job.jobDuration})${isCurrent ? ' - Current' : ''}`, 70, y, { width: 480 });
  }

  addList(doc, items, y) {
    items.forEach(item => {
      doc.fontSize(10).font('Helvetica').text(`• ${item}`, 70, y);
      y += 15;
    });
  }
}

module.exports = new PDFService();
