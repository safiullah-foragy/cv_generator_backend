const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, VerticalAlign, ImageRun } = require('docx');
const fs = require('fs');
const path = require('path');

exports.generateDOCX = async (cvData, template, sessionId, templateId) => {
  try {
    const doc = createDocument(cvData, template);
    const outputPath = path.join('generated_cvs', sessionId, `cv_template_${templateId}.docx`);

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);

    return outputPath;
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw error;
  }
};

function createDocument(data, template) {
  const style = template.style;
  const sections = [];

  // Header Section with Name
  const headerParagraphs = [
    new Paragraph({
      text: data.name || 'Name Not Provided',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `📧 ${data.gmail || 'N/A'}  |  `, size: 20 }),
        new TextRun({ text: `📱 ${data.contactNumber || 'N/A'}  |  `, size: 20 }),
        new TextRun({ text: `🌍 ${data.nationality || 'N/A'}`, size: 20 })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  ];

  // Personal Information Section
  const personalInfoParagraphs = [
    createSectionHeading('PERSONAL INFORMATION'),
    createInfoParagraph(`Father's Name: ${data.fathersName || 'N/A'}`),
    createInfoParagraph(`Mother's Name: ${data.mothersName || 'N/A'}`),
    createInfoParagraph(`Date of Birth: ${data.dateOfBirth || 'N/A'}`),
    createInfoParagraph(`Age: ${data.age || 'N/A'}`),
    createInfoParagraph(`Gender: ${data.gender || 'N/A'}`),
    createInfoParagraph(`Marital Status: ${data.maritalStatus || 'N/A'}`),
    createInfoParagraph(`Present Address: ${data.presentAddress || 'N/A'}`),
    createInfoParagraph(`Permanent Address: ${data.permanentAddress || 'N/A'}`),
    createSpacing()
  ];

  // Education Section
  const educationParagraphs = [
    createSectionHeading('EDUCATION'),
    createSubHeading('Graduation'),
    createInfoParagraph(`Subject: ${data.graduationSubject || 'N/A'}`),
    createInfoParagraph(`CGPA: ${data.graduationCGPA || 'N/A'}`),
    createInfoParagraph(`Institution: ${data.graduationInstitution || 'N/A'}`),
    createSpacing(),
    createSubHeading('Higher Secondary Certificate (HSC)'),
    createInfoParagraph(`GPA: ${data.hscGPA || 'N/A'}`),
    createInfoParagraph(`College: ${data.hscCollege || 'N/A'}`),
    createInfoParagraph(`Board: ${data.hscBoard || 'N/A'}`),
    createSpacing(),
    createSubHeading('Secondary School Certificate (SSC)'),
    createInfoParagraph(`GPA: ${data.sscGPA || 'N/A'}`),
    createInfoParagraph(`School: ${data.sscSchool || 'N/A'}`),
    createInfoParagraph(`Board: ${data.sscBoard || 'N/A'}`),
    createSpacing()
  ];

  // Employment Sections
  const employmentParagraphs = [];
  
  if (data.currentJob) {
    employmentParagraphs.push(
      createSectionHeading('CURRENT EMPLOYMENT'),
      createInfoParagraph(data.currentJob),
      createSpacing()
    );
  }

  if (data.previousJobs && data.previousJobs.length > 0) {
    employmentParagraphs.push(createSectionHeading('WORK EXPERIENCE'));
    data.previousJobs.forEach(job => {
      employmentParagraphs.push(
        createSubHeading(job.position || 'Position Not Specified'),
        createInfoParagraph(`Company: ${job.company || 'N/A'}`),
        createInfoParagraph(`Duration: ${job.duration || 'N/A'}`),
        createSpacing()
      );
    });
  }

  // Skills Section
  const skillsParagraphs = [];
  if (data.skills) {
    const skillsArray = Array.isArray(data.skills) ? data.skills : data.skills.split(',');
    skillsParagraphs.push(
      createSectionHeading('SKILLS'),
      new Paragraph({
        text: skillsArray.map(s => s.trim()).join(' • '),
        spacing: { after: 200 }
      }),
      createSpacing()
    );
  }

  // Languages Section
  const languagesParagraphs = [];
  if (data.languages) {
    const languagesText = Array.isArray(data.languages) ? data.languages.join(', ') : data.languages;
    languagesParagraphs.push(
      createSectionHeading('LANGUAGES'),
      createInfoParagraph(languagesText),
      createSpacing()
    );
  }

  // Hobbies Section
  const hobbiesParagraphs = [];
  if (data.hobbies) {
    const hobbiesText = Array.isArray(data.hobbies) ? data.hobbies.join(', ') : data.hobbies;
    hobbiesParagraphs.push(
      createSectionHeading('HOBBIES & INTERESTS'),
      createInfoParagraph(hobbiesText),
      createSpacing()
    );
  }

  // Combine all sections
  const allParagraphs = [
    ...headerParagraphs,
    ...personalInfoParagraphs,
    ...educationParagraphs,
    ...employmentParagraphs,
    ...skillsParagraphs,
    ...languagesParagraphs,
    ...hobbiesParagraphs
  ];

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440,    // 1 inch
            right: 1080,  // 0.75 inch
            bottom: 1440,
            left: 1080
          }
        }
      },
      children: allParagraphs
    }]
  });

  return doc;
}

function createSectionHeading(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    border: {
      bottom: {
        color: "3498db",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6
      }
    }
  });
}

function createSubHeading(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 120, after: 80 }
  });
}

function createInfoParagraph(text) {
  return new Paragraph({
    text: text,
    spacing: { after: 100 }
  });
}

function createSpacing() {
  return new Paragraph({
    text: '',
    spacing: { after: 200 }
  });
}

module.exports = exports;
