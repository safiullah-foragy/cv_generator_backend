# Template Update Instructions - All Fields Required

## Current Status
Templates 1 and 2 have been updated with all new fields. Templates 3-20 need updates.

## New Fields to Add to ALL Templates

### Contact Information (in header/contact sections):
- `data.alternatePhone` - Alternative phone number
- `data.linkedIn` - LinkedIn profile URL
- `data.website` - Personal website/portfolio URL

### Personal Information:
- `data.nid` - National ID number
- `data.passport` - Passport number
- `data.religion` - Religion

### Education (already in helper methods):
- `education.ssc.group` - SSC group (Science/Commerce/Arts)
- `education.hsc.group` - HSC group (Science/Commerce/Arts)
- `education.graduation.degree` - Degree name (B.Sc., BBA, etc.)

### Current Job (if exists):
- `data.currentJob.location` - Job location (city, country)
- `data.currentJob.responsibilities` - Detailed responsibilities

### Professional Sections (add before closing):
- `data.objective` - Career objective (textarea)
- `data.summary` - Professional summary (textarea)
- `data.certifications` - Certifications list (textarea)
- `data.awards` - Awards and achievements (textarea)
- `data.references` - References (textarea)

## Implementation Pattern

### For Contact Sections:
```javascript
let contactInfo = `${data.email} | ${data.phone}`;
if (data.alternatePhone) contactInfo += ` | ${data.alternatePhone}`;

if (data.linkedIn || data.website) {
  let webInfo = '';
  if (data.linkedIn) webInfo += data.linkedIn;
  if (data.website) webInfo += (webInfo ? ' | ' : '') + data.website;
  doc.fontSize(8).text(webInfo, x, y, { width: width });
}
```

### For Personal Information:
```javascript
if (data.nid) {
  doc.text(`NID: ${data.nid}`, x, y);
  y += 15;
}
if (data.passport) {
  doc.text(`Passport: ${data.passport}`, x, y);
  y += 15;
}
if (data.religion) {
  doc.text(`Religion: ${data.religion}`, x, y);
  y += 15;
}
```

### For Job Information:
```javascript
let jobInfo = job.company || job.jobCompany;
if (job.location) jobInfo += `, ${job.location}`;
jobInfo += ` | ${job.duration}`;

if (job.responsibilities) {
  y += 30;
  doc.fontSize(9).text(job.responsibilities, x, y, { width: width });
}
```

### For Professional Sections (at end of each template):
Use the helper method `addNewFieldsSections()`:
```javascript
y = this.addNewFieldsSections(doc, data, y, style, widthValue);
```

OR manually add:
```javascript
// Objective
if (data.objective) {
  this.addSection(doc, 'CAREER OBJECTIVE', y, style.primaryColor);
  y += 25;
  doc.fontSize(10).text(data.objective, x, y, { width: width, align: 'justify' });
  y += calculateHeight + 20;
}

// Summary
if (data.summary) {
  this.addSection(doc, 'PROFESSIONAL SUMMARY', y, style.primaryColor);
  y += 25;
  doc.fontSize(10).text(data.summary, x, y, { width: width, align: 'justify' });
  y += calculateHeight + 20;
}

// Certifications
if (data.certifications) {
  this.addSection(doc, 'CERTIFICATIONS', y, style.primaryColor);
  y += 25;
  doc.fontSize(10).text(data.certifications, x, y, { width: width });
  y += calculateHeight + 20;
}

// Awards
if (data.awards) {
  this.addSection(doc, 'AWARDS & ACHIEVEMENTS', y, style.primaryColor);
  y += 25;
  doc.fontSize(10).text(data.awards, x, y, { width: width });
  y += calculateHeight + 20;
}

// References
if (data.references) {
  this.addSection(doc, 'REFERENCES', y, style.primaryColor);
  y += 25;
  doc.fontSize(10).text(data.references, x, y, { width: width });
}
```

## Templates Requiring Updates

- ✅ Template 1 - DONE
- ✅ Template 2 - DONE  
- ⏳ Template 3 - Needs: contact fields in sidebar, nid/passport/religion, objective/summary in main, certifications/awards/references
- ⏳ Template 4 - Needs: all new fields
- ⏳ Template 5 - Needs: all new fields
- ⏳ Template 6 - Needs: all new fields
- ⏳ Template 7 - Needs: all new fields
- ⏳ Template 8 - Needs: all new fields
- ⏳ Template 9 - Needs: all new fields
- ⏳ Template 10 - Needs: all new fields
- ⏳ Template 11 - Needs: all new fields
- ⏳ Template 12 - Needs: all new fields
- ⏳ Template 13 - Needs: all new fields
- ⏳ Template 14 - Needs: all new fields
- ⏳ Template 15 - Needs: all new fields
- ⏳ Template 16 - Needs: all new fields
- ⏳ Template 17 - Needs: all new fields
- ⏳ Template 18 - Needs: all new fields
- ⏳ Template 19 - Needs: all new fields
- ⏳ Template 20 - Needs: all new fields

## Priority Order
1. Add objective/summary at beginning (if provided)
2. Add NID/passport/religion to personal info sections
3. Add alternate phone/LinkedIn/website to contact sections
4. Add location/responsibilities to job sections  
5. Add certifications/awards/references at end

## Testing
After updating each template:
1. Fill form with ALL fields
2. Select that specific template
3. Generate and verify all fields appear
4. Check formatting and layout

## Helper Methods Available
- `addNewFieldsSections(doc, data, y, style, width)` - Adds cert/awards/refs
- `addEducation()` - Now includes groups and degree
- `addJob()` - Now includes location and responsibilities
- `addPhotoWithFrame()` - Professional photo frames
