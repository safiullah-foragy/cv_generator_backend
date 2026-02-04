const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType, BorderStyle } = require('docx');
const fs = require('fs');

class DOCXService {
  async generateDOCX(cvData, templateId, outputPath) {
    let doc;
    
    switch(templateId) {
      case 1:
        doc = this.createTemplate1(cvData);
        break;
      case 2:
        doc = this.createTemplate2(cvData);
        break;
      case 3:
        doc = this.createTemplate3(cvData);
        break;
      case 4:
        doc = this.createTemplate4(cvData);
        break;
      case 5:
        doc = this.createTemplate5(cvData);
        break;
      case 6:
        doc = this.createTemplate6(cvData);
        break;
      case 7:
        doc = this.createTemplate7(cvData);
        break;
      case 8:
        doc = this.createTemplate8(cvData);
        break;
      case 9:
        doc = this.createTemplate9(cvData);
        break;
      case 10:
        doc = this.createTemplate10(cvData);
        break;
      case 11:
        doc = this.createTemplate11(cvData);
        break;
      case 12:
        doc = this.createTemplate12(cvData);
        break;
      case 13:
        doc = this.createTemplate13(cvData);
        break;
      case 14:
        doc = this.createTemplate14(cvData);
        break;
      case 15:
        doc = this.createTemplate15(cvData);
        break;
      case 16:
        doc = this.createTemplate16(cvData);
        break;
      case 17:
        doc = this.createTemplate17(cvData);
        break;
      case 18:
        doc = this.createTemplate18(cvData);
        break;
      case 19:
        doc = this.createTemplate19(cvData);
        break;
      case 20:
        doc = this.createTemplate20(cvData);
        break;
      default:
        doc = this.createTemplate1(cvData);
    }

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
  }

  createTemplate1(data) {
    const sections = [];

    // Header with name
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );

    // Contact Info
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: `${data.email} | ${data.phone}`, size: 20 })
        ],
        spacing: { after: 400 }
      })
    );

    // Personal Information
    sections.push(...this.createSection('PERSONAL INFORMATION', [
      `Date of Birth: ${data.dateOfBirth}`,
      `Age: ${data.age}`,
      `Gender: ${data.gender}`,
      `Marital Status: ${data.maritalStatus}`,
      `Nationality: ${data.nationality}`,
      `Present Address: ${data.presentAddress}`,
      `Permanent Address: ${data.permanentAddress}`
    ]));

    // Family Information
    sections.push(...this.createSection('FAMILY INFORMATION', [
      `Father's Name: ${data.fatherName}`,
      `Mother's Name: ${data.motherName}`
    ]));

    // Education
    const eduContent = [
      `SSC: GPA ${data.education.ssc.gpa}, ${data.education.ssc.board} Board`,
      `School: ${data.education.ssc.schoolName}`,
      '',
      `HSC: GPA ${data.education.hsc.gpa}, ${data.education.hsc.board} Board`,
      `College: ${data.education.hsc.collegeName}`,
      '',
      `Graduation: ${data.education.graduation.subject}`,
      `CGPA: ${data.education.graduation.cgpa}`,
      `Institution: ${data.education.graduation.institution}`
    ];
    sections.push(...this.createSection('EDUCATION', eduContent));

    // Skills
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS', data.skills));
    }

    // Work Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      const expContent = [];
      
      if (data.currentJob) {
        expContent.push(
          `${data.currentJob.title} (Current)`,
          `${data.currentJob.company}`,
          `Duration: ${data.currentJob.duration}`,
          ''
        );
      }
      
      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          expContent.push(
            `${job.title || job.jobTitle}`,
            `${job.company || job.jobCompany}`,
            `Duration: ${job.duration || job.jobDuration}`,
            ''
          );
        });
      }
      
      sections.push(...this.createSection('WORK EXPERIENCE', expContent));
    }

    // Languages
    if (data.languages && data.languages.length > 0) {
      sections.push(...this.createSection('LANGUAGES', data.languages));
    }

    // Hobbies
    if (data.hobbies && data.hobbies.length > 0) {
      sections.push(...this.createSection('HOBBIES', data.hobbies));
    }

    return new Document({
      sections: [{
        properties: {},
        children: sections
      }]
    });
  }

  createTemplate2(data) {
    const sections = [];

    // Name
    sections.push(
      new Paragraph({
        text: data.name,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 }
      })
    );

    // Contact
    sections.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${data.email} | ${data.phone}`, size: 22 })
        ],
        spacing: { after: 300 }
      })
    );

    // Professional Summary
    sections.push(
      new Paragraph({
        text: 'PROFESSIONAL PROFILE',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      })
    );

    sections.push(
      new Paragraph({
        text: `${data.age} years old ${data.gender}, ${data.maritalStatus}. Nationality: ${data.nationality}`,
        spacing: { after: 300 }
      })
    );

    // Education
    sections.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      })
    );

    sections.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Graduation | ', bold: true }),
          new TextRun({ text: `${data.education.graduation.subject}, CGPA: ${data.education.graduation.cgpa}` })
        ]
      })
    );

    sections.push(
      new Paragraph({
        text: data.education.graduation.institution,
        spacing: { after: 200 }
      })
    );

    sections.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'HSC | ', bold: true }),
          new TextRun({ text: `GPA: ${data.education.hsc.gpa}, ${data.education.hsc.board} Board` })
        ]
      })
    );

    sections.push(
      new Paragraph({
        text: data.education.hsc.collegeName,
        spacing: { after: 200 }
      })
    );

    sections.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'SSC | ', bold: true }),
          new TextRun({ text: `GPA: ${data.education.ssc.gpa}, ${data.education.ssc.board} Board` })
        ]
      })
    );

    sections.push(
      new Paragraph({
        text: data.education.ssc.schoolName,
        spacing: { after: 300 }
      })
    );

    // Skills
    if (data.skills && data.skills.length > 0) {
      sections.push(
        new Paragraph({
          text: 'SKILLS',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 200 }
        })
      );

      sections.push(
        new Paragraph({
          text: data.skills.join(' • '),
          spacing: { after: 300 }
        })
      );
    }

    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(
        new Paragraph({
          text: 'WORK EXPERIENCE',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 200 }
        })
      );

      if (data.currentJob) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${data.currentJob.title} `, bold: true }),
              new TextRun({ text: '(Current)' })
            ]
          })
        );

        sections.push(
          new Paragraph({
            text: `${data.currentJob.company} | ${data.currentJob.duration}`,
            spacing: { after: 200 }
          })
        );
      }

      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          sections.push(
            new Paragraph({
              text: job.title || job.jobTitle,
              bold: true
            })
          );

          sections.push(
            new Paragraph({
              text: `${job.company || job.jobCompany} | ${job.duration || job.jobDuration}`,
              spacing: { after: 200 }
            })
          );
        });
      }
    }

    return new Document({
      sections: [{
        properties: {},
        children: sections
      }]
    });
  }

  createTemplate3(data) {
    // Similar to template 1 but with different styling
    return this.createTemplate1(data);
  }

  createTemplate4(data) {
    // Modern minimalist
    const sections = [];

    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );

    sections.push(
      new Paragraph({
        text: `${data.email} • ${data.phone}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    );

    // Compact education
    sections.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      })
    );

    sections.push(
      new Paragraph({
        text: `• ${data.education.graduation.subject}, CGPA: ${data.education.graduation.cgpa} - ${data.education.graduation.institution}`,
        spacing: { after: 100 }
      })
    );

    sections.push(
      new Paragraph({
        text: `• HSC, GPA: ${data.education.hsc.gpa}, ${data.education.hsc.board} Board - ${data.education.hsc.collegeName}`,
        spacing: { after: 100 }
      })
    );

    sections.push(
      new Paragraph({
        text: `• SSC, GPA: ${data.education.ssc.gpa}, ${data.education.ssc.board} Board - ${data.education.ssc.schoolName}`,
        spacing: { after: 300 }
      })
    );

    // Experience
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(
        new Paragraph({
          text: 'EXPERIENCE',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 200 }
        })
      );

      if (data.currentJob) {
        sections.push(
          new Paragraph({
            text: `• ${data.currentJob.title} at ${data.currentJob.company} (${data.currentJob.duration}) - Current`,
            spacing: { after: 100 }
          })
        );
      }

      if (data.previousJobs) {
        data.previousJobs.forEach(job => {
          sections.push(
            new Paragraph({
              text: `• ${job.title || job.jobTitle} at ${job.company || job.jobCompany} (${job.duration || job.jobDuration})`,
              spacing: { after: 100 }
            })
          );
        });
      }
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      sections.push(
        new Paragraph({
          text: 'SKILLS',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 200 }
        })
      );

      sections.push(
        new Paragraph({
          text: data.skills.join(' • ')
        })
      );
    }

    return new Document({
      sections: [{
        properties: {},
        children: sections
      }]
    });
  }

  createTemplate5(data) {
    return this.createTemplate2(data);
  }

  createTemplate6(data) {
    return this.createTemplate1(data);
  }

  createTemplate7(data) {
    return this.createTemplate2(data);
  }

  createTemplate8(data) {
    return this.createTemplate4(data);
  }

  createTemplate9(data) {
    return this.createTemplate1(data);
  }

  createTemplate10(data) {
    return this.createTemplate2(data);
  }

  createTemplate11(data) {
    const sections = [];
    
    // Title
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    // Photo note
    sections.push(
      new Paragraph({
        text: '[PROFILE PHOTO]',
        alignment: AlignmentType.CENTER,
        italics: true,
        spacing: { after: 200 }
      })
    );
    
    // Contact
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: `${data.email} | ${data.phone}`, size: 22 })
        ],
        spacing: { after: 300 }
      })
    );
    
    // Personal & Education
    sections.push(...this.createSection('PERSONAL INFORMATION', [
      `Date of Birth: ${data.dateOfBirth}`,
      `Age: ${data.age} | Gender: ${data.gender} | Status: ${data.maritalStatus}`,
      `Nationality: ${data.nationality}`,
      `Address: ${data.presentAddress}`
    ]));
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS', [data.skills.join(' • ')]));
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('WORK EXPERIENCE', this.getExperienceContent(data)));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate12(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: '[PHOTO]',
        alignment: AlignmentType.CENTER,
        italics: true,
        spacing: { after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: `${data.email} | ${data.phone}`, size: 20 })
        ],
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('PROFESSIONAL SUMMARY', [
      `${data.age} years old ${data.gender}, ${data.maritalStatus}. ${data.nationality}. Contact: ${data.phone}, ${data.email}`
    ]));
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS', [data.skills.join(' • ')]));
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('PROFESSIONAL EXPERIENCE', this.getExperienceContent(data)));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate13(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: '[PROFILE PHOTO]',
        alignment: AlignmentType.CENTER,
        italics: true,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Email: ', bold: true }),
          new TextRun({ text: data.email }),
          new TextRun({ text: ' | Phone: ', bold: true }),
          new TextRun({ text: data.phone })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('PERSONAL DETAILS', [
      `Age: ${data.age} | Gender: ${data.gender} | Marital Status: ${data.maritalStatus}`,
      `Nationality: ${data.nationality}`,
      `Present Address: ${data.presentAddress}`,
      `Permanent Address: ${data.permanentAddress}`,
      `Father's Name: ${data.fatherName}`,
      `Mother's Name: ${data.motherName}`
    ]));
    
    sections.push(...this.createSection('EDUCATIONAL BACKGROUND', this.getEducationContent(data)));
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('PROFESSIONAL EXPERIENCE', this.getExperienceContent(data)));
    }
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('CORE COMPETENCIES', [data.skills.join(' • ')]));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate14(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: '[PROFILE PHOTO]',
        italics: true,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `${data.email} | ${data.phone}`,
        spacing: { after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: data.presentAddress,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('CONTACT & PERSONAL', [
      `DOB: ${data.dateOfBirth} | Age: ${data.age}`,
      `Gender: ${data.gender} | Status: ${data.maritalStatus}`,
      `Nationality: ${data.nationality}`
    ]));
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS', [data.skills.join(', ')]));
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('EXPERIENCE', this.getExperienceContent(data)));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate15(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: '[PHOTO]',
        alignment: AlignmentType.CENTER,
        italics: true,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: `${data.email} | ${data.phone}`, size: 22 })
        ],
        spacing: { after: 300 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `${data.dateOfBirth} | ${data.age} years | ${data.gender} | ${data.maritalStatus} | ${data.nationality}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS', [data.skills.join(' • ')]));
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('WORK EXPERIENCE', this.getExperienceContent(data)));
    }
    
    if (data.languages && data.languages.length > 0) {
      sections.push(...this.createSection('LANGUAGES', [data.languages.join(', ')]));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate16(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: '[PROFILE PHOTO]',
        italics: true,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `${data.email} • ${data.phone}`,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('PROFILE', [
      `${data.age} years old ${data.gender}, ${data.maritalStatus}. ${data.nationality}. Currently residing at ${data.presentAddress}.`
    ]));
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('PROFESSIONAL EXPERIENCE', this.getExperienceContent(data)));
    }
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('TECHNICAL SKILLS', [data.skills.join(' • ')]));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate17(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: '[LARGE PROFILE PHOTO]',
        alignment: AlignmentType.CENTER,
        italics: true,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: `${data.email} | ${data.phone}` })
        ],
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `${data.age} yrs • ${data.gender} • ${data.maritalStatus} • ${data.nationality}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('ACADEMIC CREDENTIALS', this.getEducationContent(data)));
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('WORK EXPERIENCE', this.getExperienceContent(data)));
    }
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS', [data.skills.join(', ')]));
    }
    
    if (data.languages && data.languages.length > 0) {
      sections.push(...this.createSection('LANGUAGES', [data.languages.join(', ')]));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate18(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `${data.email} | ${data.phone}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: data.presentAddress,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: '[PROFILE PHOTO]',
        alignment: AlignmentType.CENTER,
        italics: true,
        spacing: { after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `Age: ${data.age} | Gender: ${data.gender} | Status: ${data.maritalStatus} | Nationality: ${data.nationality}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS & COMPETENCIES', [data.skills.join(' • ')]));
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('PROFESSIONAL EXPERIENCE', this.getExperienceContent(data)));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate19(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: '[PROFILE PHOTO IN ELEGANT FRAME]',
        alignment: AlignmentType.CENTER,
        italics: true,
        spacing: { after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `${data.email} • ${data.phone}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: data.presentAddress,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('PERSONAL DETAILS', [
      `Date of Birth: ${data.dateOfBirth} | Age: ${data.age} | Gender: ${data.gender}`,
      `Marital Status: ${data.maritalStatus} | Nationality: ${data.nationality}`
    ]));
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('PROFESSIONAL EXPERIENCE', this.getExperienceContent(data)));
    }
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('KEY SKILLS', [data.skills.join(' • ')]));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  createTemplate20(data) {
    const sections = [];
    
    sections.push(
      new Paragraph({
        text: data.name.toUpperCase(),
        heading: HeadingLevel.TITLE,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: '[PROFILE PHOTO]',
        italics: true,
        spacing: { after: 100 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: `${data.email} | ${data.phone}`,
        spacing: { after: 300 }
      })
    );
    
    sections.push(...this.createSection('PERSONAL INFO', [
      `DOB: ${data.dateOfBirth} | Age: ${data.age}`,
      `Gender: ${data.gender} | Status: ${data.maritalStatus}`,
      `Nationality: ${data.nationality}`,
      `Address: ${data.presentAddress}`
    ]));
    
    sections.push(...this.createSection('EDUCATION', this.getEducationContent(data)));
    
    if (data.skills && data.skills.length > 0) {
      sections.push(...this.createSection('SKILLS', [data.skills.join(' • ')]));
    }
    
    if (data.currentJob || (data.previousJobs && data.previousJobs.length > 0)) {
      sections.push(...this.createSection('WORK EXPERIENCE', this.getExperienceContent(data)));
    }
    
    return new Document({ sections: [{ children: sections }] });
  }

  // Helper method to get education content
  getEducationContent(data) {
    return [
      `Graduation: ${data.education.graduation.subject}, CGPA ${data.education.graduation.cgpa}`,
      `Institution: ${data.education.graduation.institution}`,
      '',
      `HSC: GPA ${data.education.hsc.gpa}, ${data.education.hsc.board} Board`,
      `College: ${data.education.hsc.collegeName}`,
      '',
      `SSC: GPA ${data.education.ssc.gpa}, ${data.education.ssc.board} Board`,
      `School: ${data.education.ssc.schoolName}`
    ];
  }

  // Helper method to get experience content
  getExperienceContent(data) {
    const content = [];
    
    if (data.currentJob) {
      content.push(`${data.currentJob.title || data.currentJob.jobTitle} (Current)`);
      content.push(`${data.currentJob.company || data.currentJob.jobCompany} | ${data.currentJob.duration || data.currentJob.jobDuration}`);
      content.push('');
    }
    
    if (data.previousJobs && data.previousJobs.length > 0) {
      data.previousJobs.forEach(job => {
        content.push(`${job.title || job.jobTitle}`);
        content.push(`${job.company || job.jobCompany} | ${job.duration || job.jobDuration}`);
        content.push('');
      });
    }
    
    return content;
  }

  // Helper method to create sections
  createSection(title, content) {
    const paragraphs = [];

    paragraphs.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 200 }
      })
    );

    content.forEach(line => {
      if (line === '') {
        paragraphs.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      } else {
        paragraphs.push(
          new Paragraph({
            text: line,
            spacing: { after: 100 }
          })
        );
      }
    });

    return paragraphs;
  }
}

module.exports = new DOCXService();
