import React, { useState } from 'react';
import axios from 'axios';
import './CVForm.css';
import TemplateSelector from './TemplateSelector';

const CVForm = ({ onCVGenerated, loading, setLoading }) => {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    fatherName: '',
    motherName: '',
    presentAddress: '',
    permanentAddress: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    nid: '',
    passport: '',
    religion: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    linkedIn: '',
    website: '',
    
    // Education - SSC
    sscGpa: '',
    sscSchool: '',
    sscBoard: '',
    sscYear: '',
    sscGroup: '',
    
    // Education - HSC
    hscGpa: '',
    hscCollege: '',
    hscBoard: '',
    hscYear: '',
    hscGroup: '',
    
    // Education - Graduation
    graduationSubject: '',
    graduationCgpa: '',
    graduationInstitution: '',
    graduationYear: '',
    graduationDegree: '',
    
    // Professional
    currentJob: false,
    currentJobTitle: '',
    currentJobCompany: '',
    currentJobDuration: '',
    currentJobLocation: '',
    currentJobResponsibilities: '',
    
    // Additional Information
    skills: '',
    languages: '',
    hobbies: '',
    certifications: '',
    awards: '',
    references: '',
    objective: '',
    summary: ''
  });

  const [previousJobs, setPreviousJobs] = useState([]);
  const [currentPrevJob, setCurrentPrevJob] = useState({
    jobTitle: '',
    jobCompany: '',
    jobDuration: ''
  });

  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePrevJobChange = (e) => {
    const { name, value } = e.target;
    setCurrentPrevJob({
      ...currentPrevJob,
      [name]: value
    });
  };

  const addPreviousJob = () => {
    if (currentPrevJob.jobTitle && currentPrevJob.jobCompany && currentPrevJob.jobDuration) {
      setPreviousJobs([...previousJobs, currentPrevJob]);
      setCurrentPrevJob({
        jobTitle: '',
        jobCompany: '',
        jobDuration: ''
      });
    }
  };

  const removePreviousJob = (index) => {
    setPreviousJobs(previousJobs.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    // Education validation
    if (!formData.sscGpa) newErrors.sscGpa = 'SSC GPA is required';
    if (!formData.hscGpa) newErrors.hscGpa = 'HSC GPA is required';
    if (!formData.graduationCgpa) newErrors.graduationCgpa = 'Graduation CGPA is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (selectedTemplates.length === 0) {
      alert('Please select at least one template');
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();

    // Append all form fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    // Append selected templates as JSON
    formDataToSend.append('selectedTemplates', JSON.stringify(selectedTemplates));

    // Append previous jobs as JSON
    formDataToSend.append('previousJobs', JSON.stringify(previousJobs));

    // Append photo if exists
    if (photo) {
      formDataToSend.append('photo', photo);
    }

    try {
      const response = await axios.post('/api/generate-cv', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        onCVGenerated(response.data.data);
      } else {
        alert('Failed to generate CV');
      }
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('Error generating CV. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-form-container">
      <form onSubmit={handleSubmit} className="cv-form">
        
        {/* Personal Information */}
        <div className="form-section">
          <h2>📋 Personal Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                required
              />
            </div>

            <div className="form-group">
              <label>Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error' : ''}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>NID Number</label>
              <input
                type="text"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                placeholder="National ID number"
              />
            </div>

            <div className="form-group">
              <label>Passport Number</label>
              <input
                type="text"
                name="passport"
                value={formData.passport}
                onChange={handleChange}
                placeholder="Passport number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Religion</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Present Address</label>
            <textarea
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Permanent Address</label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-section">
          <h2>📞 Contact Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Alternate Phone</label>
              <input
                type="tel"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                placeholder="Alternative contact number"
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Website / Portfolio</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        {/* Education - SSC */}
        <div className="form-section">
          <h2>🎓 Education - SSC</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>GPA *</label>
              <input
                type="text"
                name="sscGpa"
                value={formData.sscGpa}
                onChange={handleChange}
                className={errors.sscGpa ? 'error' : ''}
                required
              />
            </div>

            <div className="form-group">
              <label>Group</label>
              <select
                name="sscGroup"
                value={formData.sscGroup}
                onChange={handleChange}
              >
                <option value="">Select Group</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Board</label>
              <input
                type="text"
                name="sscBoard"
                value={formData.sscBoard}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>School Name</label>
              <input
                type="text"
                name="sscSchool"
                value={formData.sscSchool}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                name="sscYear"
                value={formData.sscYear}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Education - HSC */}
        <div className="form-section">
          <h2>🎓 Education - HSC</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>GPA *</label>
              <input
                type="text"
                name="hscGpa"
                value={formData.hscGpa}
                onChange={handleChange}
                className={errors.hscGpa ? 'error' : ''}
                required
              />
            </div>

            <div className="form-group">
              <label>Group</label>
              <select
                name="hscGroup"
                value={formData.hscGroup}
                onChange={handleChange}
              >
                <option value="">Select Group</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Board</label>
              <input
                type="text"
                name="hscBoard"
                value={formData.hscBoard}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>College Name</label>
              <input
                type="text"
                name="hscCollege"
                value={formData.hscCollege}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                name="hscYear"
                value={formData.hscYear}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Education - Graduation */}
        <div className="form-section">
          <h2>🎓 Education - Graduation</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                name="graduationDegree"
                value={formData.graduationDegree}
                onChange={handleChange}
                placeholder="B.Sc., BBA, BA, etc."
              />
            </div>

            <div className="form-group">
              <label>Subject/Major</label>
              <input
                type="text"
                name="graduationSubject"
                value={formData.graduationSubject}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CGPA *</label>
              <input
                type="text"
                name="graduationCgpa"
                value={formData.graduationCgpa}
                onChange={handleChange}
                className={errors.graduationCgpa ? 'error' : ''}
                required
              />
            </div>

            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                name="graduationInstitution"
                value={formData.graduationInstitution}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Current Job */}
        <div className="form-section">
          <h2>💼 Current Job</h2>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="currentJob"
                checked={formData.currentJob}
                onChange={handleChange}
              />
              I am currently employed
            </label>
          </div>

          {formData.currentJob && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="currentJobTitle"
                    value={formData.currentJobTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="currentJobCompany"
                    value={formData.currentJobCompany}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="currentJobLocation"
                    value={formData.currentJobLocation}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="currentJobDuration"
                    value={formData.currentJobDuration}
                    onChange={handleChange}
                    placeholder="e.g., 2 years"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Key Responsibilities</label>
                <textarea
                  name="currentJobResponsibilities"
                  value={formData.currentJobResponsibilities}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List your main responsibilities and achievements"
                />
              </div>
            </>
          )}
        </div>

        {/* Previous Jobs */}
        <div className="form-section">
          <h2>💼 Previous Jobs</h2>
          
          <div className="previous-jobs-list">
            {previousJobs.map((job, index) => (
              <div key={index} className="job-item">
                <div>
                  <strong>{job.jobTitle}</strong> at {job.jobCompany}
                  <br />
                  <small>Duration: {job.jobDuration}</small>
                </div>
                <button
                  type="button"
                  onClick={() => removePreviousJob(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={currentPrevJob.jobTitle}
                onChange={handlePrevJobChange}
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="jobCompany"
                value={currentPrevJob.jobCompany}
                onChange={handlePrevJobChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="jobDuration"
              value={currentPrevJob.jobDuration}
              onChange={handlePrevJobChange}
              placeholder="e.g., 1 year 6 months"
            />
          </div>

          <button
            type="button"
            onClick={addPreviousJob}
            className="add-job-btn"
          >
            + Add Previous Job
          </button>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h2>✨ Additional Information</h2>
          
          <div className="form-group">
            <label>Career Objective</label>
            <textarea
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              placeholder="Brief career objective or goal (optional)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Professional Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief professional summary highlighting key achievements (optional)"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Skills (comma-separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js, Project Management"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Languages (comma-separated)</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="e.g., English, Bengali, Hindi"
              />
            </div>

            <div className="form-group">
              <label>Hobbies (comma-separated)</label>
              <input
                type="text"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder="e.g., Reading, Traveling, Photography"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Certifications</label>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="List your certifications (one per line)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Awards & Achievements</label>
            <textarea
              name="awards"
              value={formData.awards}
              onChange={handleChange}
              placeholder="List your awards and achievements (one per line)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>References</label>
            <textarea
              name="references"
              value={formData.references}
              onChange={handleChange}
              placeholder="Reference contacts (optional - can provide 'Available upon request')"
              rows="2"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="form-section">
          <h2>📸 Professional Photo</h2>
          <div className="photo-upload-container">
            <label className="photo-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
              <div className="upload-area">
                {photo ? (
                  <div className="photo-preview">
                    <img src={URL.createObjectURL(photo)} alt="Preview" />
                    <p>{photo.name}</p>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon">📷</div>
                    <p>Click to upload your professional photo</p>
                    <small>JPG, JPEG or PNG (Max 5MB)</small>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Template Selection */}
        <TemplateSelector 
          selectedTemplates={selectedTemplates} 
          setSelectedTemplates={setSelectedTemplates} 
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Generating CVs...' : `🚀 Generate ${selectedTemplates.length} CV${selectedTemplates.length !== 1 ? 's' : ''}`}
        </button>
      </form>
    </div>
  );
};

export default CVForm;
