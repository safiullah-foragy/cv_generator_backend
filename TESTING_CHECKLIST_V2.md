# Testing Checklist - Professional CV Generator v2.0

## Pre-Testing Setup
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Both servers showing no errors in console
- [ ] Database/file system accessible
- [ ] Test images available for photo upload

## 1. Template Selection Testing

### Visual Display
- [ ] Template selector displays below form
- [ ] All 20 templates visible in grid
- [ ] Each template shows:
  - [ ] Template number
  - [ ] Color preview bar
  - [ ] Template name
  - [ ] Style description
- [ ] Grid is responsive on different screen sizes
- [ ] Cards have proper spacing and alignment

### Selection Functionality
- [ ] Click on template card selects it
- [ ] Selected template shows green border
- [ ] Selected template shows checkmark (✓) badge
- [ ] Click on selected template deselects it
- [ ] Border and checkmark removed on deselect
- [ ] Multiple templates can be selected simultaneously

### Batch Controls
- [ ] "Select All" button exists and is visible
- [ ] Clicking "Select All" selects all 20 templates
- [ ] All templates show green border + checkmark after Select All
- [ ] "Clear All" button exists and is visible
- [ ] Clicking "Clear All" removes all selections
- [ ] All borders and checkmarks removed after Clear All

### Submit Button
- [ ] Button text shows "Generate X CVs" (X = count)
- [ ] Count updates when templates selected/deselected
- [ ] Shows "Generate 0 CVs" when nothing selected
- [ ] Shows "Generate 20 CVs" when all selected

## 2. New Form Fields Testing

### Personal Information Section
- [ ] NID Number field present
- [ ] NID accepts text input
- [ ] Passport Number field present
- [ ] Passport accepts text input
- [ ] Religion field present
- [ ] Religion accepts text input
- [ ] All fields have proper labels

### Contact Information Section
- [ ] Alternate Phone field present
- [ ] Alternate Phone accepts phone number
- [ ] Placeholder shows "Alternative contact number"
- [ ] LinkedIn Profile field present
- [ ] LinkedIn accepts URL format
- [ ] Placeholder shows LinkedIn URL format
- [ ] Website/Portfolio field present
- [ ] Website accepts URL format
- [ ] Placeholder shows website URL format

### Education - SSC Section
- [ ] Group dropdown present
- [ ] Dropdown shows: Science, Commerce, Arts
- [ ] Default shows "Select Group"
- [ ] Selection saves properly

### Education - HSC Section
- [ ] Group dropdown present
- [ ] Dropdown shows: Science, Commerce, Arts
- [ ] Board field reordered after Group
- [ ] All fields properly aligned

### Education - Graduation Section
- [ ] Degree field present (first in section)
- [ ] Placeholder shows "B.Sc., BBA, BA, etc."
- [ ] Subject/Major field present
- [ ] CGPA field present
- [ ] Institution field present
- [ ] Year field present

### Current Job Section
- [ ] Location field present
- [ ] Location placeholder shows "City, Country"
- [ ] Key Responsibilities field present
- [ ] Responsibilities is textarea (3 rows)
- [ ] Placeholder shows helpful text
- [ ] Fields only show when "Currently employed" checked

### Additional Information Section
- [ ] Objective field present
- [ ] Objective is textarea (3 rows)
- [ ] Summary field present
- [ ] Summary is textarea (3 rows)
- [ ] Certifications field present
- [ ] Certifications is textarea (3 rows)
- [ ] Awards field present
- [ ] Awards is textarea (3 rows)
- [ ] References field present
- [ ] References is textarea (2 rows)

### Photo Upload Section
- [ ] Upload Photo label present
- [ ] File input accepts image files only
- [ ] Photo preview appears after selection
- [ ] Preview shows uploaded image
- [ ] Preview has proper styling
- [ ] Preview updates when different photo selected

## 3. Form Validation Testing

### Required Fields
- [ ] Name is required
- [ ] Email is required
- [ ] Phone is required
- [ ] SSC GPA is required
- [ ] HSC GPA is required
- [ ] Graduation CGPA is required

### Template Validation
- [ ] Error shows when submitting with 0 templates selected
- [ ] Error message: "Please select at least one template"
- [ ] Form doesn't submit without template selection
- [ ] Form submits successfully with at least 1 template

### Field Validation
- [ ] Error shows when required fields empty
- [ ] Error message: "Please fill in all required fields"
- [ ] Email validates format
- [ ] URLs validate format (LinkedIn, website)

## 4. Backend Processing Testing

### Data Reception
- [ ] Backend receives selectedTemplates array
- [ ] Backend logs show template count
- [ ] Backend receives all new fields:
  - [ ] nid
  - [ ] passport
  - [ ] religion
  - [ ] alternatePhone
  - [ ] linkedIn
  - [ ] website
  - [ ] sscGroup
  - [ ] hscGroup
  - [ ] graduationDegree
  - [ ] currentJobLocation
  - [ ] currentJobResponsibilities
  - [ ] objective
  - [ ] summary
  - [ ] certifications
  - [ ] awards
  - [ ] references

### Template Generation
- [ ] Only selected templates are generated
- [ ] Generated count matches selected count
- [ ] If 3 templates selected, exactly 6 files created (3 PDF + 3 DOCX)
- [ ] File names include correct template IDs
- [ ] Files are saved in 'generated' folder

### Photo Handling
- [ ] Photo uploaded successfully
- [ ] Photo saved in 'uploads' folder
- [ ] Photo path stored correctly in cvData
- [ ] Photo accessible to PDF generation

## 5. PDF Generation Testing

### Photo Frames
- [ ] Template 1 uses new frame system
- [ ] Double border frame displays correctly
- [ ] Photo is properly sized (70x70)
- [ ] Frame color matches template (#FFFFFF for Template 1)
- [ ] Photo doesn't overflow frame
- [ ] Frame looks professional

### New Fields in PDFs
- [ ] Test with Template 1 (updated):
  - [ ] NID appears if provided
  - [ ] Passport appears if provided
  - [ ] Religion appears if provided
  - [ ] LinkedIn appears if provided
  - [ ] Website appears if provided
  - [ ] Alternate phone appears if provided
  - [ ] Graduation degree appears
  - [ ] Job location appears
  - [ ] Job responsibilities appear
  - [ ] Objective appears
  - [ ] Summary appears
  - [ ] Certifications appear
  - [ ] Awards appear
  - [ ] References appear

### Layout Quality
- [ ] Text doesn't overlap
- [ ] Sections properly spaced
- [ ] Headers clearly visible
- [ ] Font sizes appropriate
- [ ] Colors render correctly
- [ ] Photo positioned correctly
- [ ] No content overflow off page

## 6. DOCX Generation Testing

### File Creation
- [ ] DOCX files created for selected templates
- [ ] Files downloadable
- [ ] Files open in Word/LibreOffice without errors

### Content Verification
- [ ] Basic fields present
- [ ] Photo placeholder [PHOTO] visible
- [ ] New fields need manual verification (future update)

## 7. Download & Results Testing

### Results Display
- [ ] Success message appears after generation
- [ ] Results section shows generated files
- [ ] Each template listed separately
- [ ] Both PDF and DOCX download links present

### Download Functionality
- [ ] PDF download links work
- [ ] DOCX download links work
- [ ] Downloaded files not corrupted
- [ ] Files open successfully
- [ ] File names are unique (timestamp included)

### View Functionality
- [ ] PDF view links work
- [ ] PDFs display in browser
- [ ] Content readable in browser view

## 8. User Experience Testing

### Loading States
- [ ] Loading indicator appears during generation
- [ ] Submit button disabled while loading
- [ ] User can't submit multiple times
- [ ] Loading clears after completion

### Error Handling
- [ ] Appropriate error for missing required fields
- [ ] Appropriate error for no template selection
- [ ] Network error handling
- [ ] Server error handling
- [ ] Clear error messages to user

### Responsive Design
- [ ] Form works on desktop (1920px)
- [ ] Form works on laptop (1366px)
- [ ] Form works on tablet (768px)
- [ ] Form works on mobile (375px)
- [ ] Template grid adjusts per screen size
- [ ] Form inputs stack properly on mobile

## 9. Performance Testing

### Generation Speed
- [ ] 1 template generates in < 3 seconds
- [ ] 5 templates generate in < 8 seconds
- [ ] 20 templates generate in < 20 seconds
- [ ] Server doesn't timeout
- [ ] Memory usage reasonable

### UI Responsiveness
- [ ] Template selection instant (<100ms)
- [ ] Form input responsive
- [ ] No lag when typing
- [ ] Smooth scrolling
- [ ] No UI freezes

## 10. Cross-Browser Testing

### Chrome
- [ ] All features work
- [ ] Layout correct
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] Layout correct
- [ ] No console errors

### Safari
- [ ] All features work
- [ ] Layout correct
- [ ] No console errors

### Edge
- [ ] All features work
- [ ] Layout correct
- [ ] No console errors

## 11. Edge Cases Testing

### Photo Upload
- [ ] Works without photo (generates without photo)
- [ ] Works with very large photo (>2MB)
- [ ] Rejects non-image files
- [ ] Handles corrupt image files gracefully

### Text Fields
- [ ] Long text in objective (500+ chars)
- [ ] Special characters in name
- [ ] Empty optional fields
- [ ] Very long addresses

### Template Selection
- [ ] Select 1 template only
- [ ] Select exactly 10 templates
- [ ] Select all 20 templates
- [ ] Rapidly click templates (stress test)

### Form State
- [ ] Fill form, clear, refill
- [ ] Switch between sections
- [ ] Add/remove previous jobs
- [ ] Upload photo, remove, upload different

## 12. Integration Testing

### Full Flow - Scenario 1: Job Application
1. [ ] Fill all required fields
2. [ ] Add NID and passport
3. [ ] Add LinkedIn and website
4. [ ] Upload professional photo
5. [ ] Add objective and summary
6. [ ] Add 2 certifications
7. [ ] Select templates 1, 7, 10 (professional)
8. [ ] Submit and verify 6 files generated
9. [ ] Download all PDFs
10. [ ] Verify all data appears correctly

### Full Flow - Scenario 2: Comprehensive CV
1. [ ] Fill all fields (including optional)
2. [ ] Add current job with responsibilities
3. [ ] Add 3 previous jobs
4. [ ] Add 5 skills, 3 languages, 2 hobbies
5. [ ] Upload photo
6. [ ] Add objective, summary, certifications, awards, references
7. [ ] Select all 20 templates
8. [ ] Verify 40 files generated
9. [ ] Spot check 5 random templates
10. [ ] Verify completeness

### Full Flow - Scenario 3: Minimal CV
1. [ ] Fill only required fields
2. [ ] Don't upload photo
3. [ ] Select template 1 only
4. [ ] Verify 2 files generated
5. [ ] Check PDFs handle missing data gracefully

## Test Results Summary

### Pass/Fail Counts
- Total Tests: ___
- Passed: ___
- Failed: ___
- Skipped: ___

### Critical Issues Found
1. 
2. 
3. 

### Minor Issues Found
1. 
2. 
3. 

### Recommendations
1. 
2. 
3. 

---

## Testing Notes

**Tester Name**: _________________
**Test Date**: _________________
**Environment**: _________________
**Browser**: _________________
**OS**: _________________

**Additional Comments**:
_________________________________________________
_________________________________________________
_________________________________________________

---

**Status**: ⬜ Not Started | 🔄 In Progress | ✅ Completed | ❌ Failed
