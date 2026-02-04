import React from 'react';
import './CVResults.css';

const CVResults = ({ cvs, onReset }) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL || '';

  const handleDownload = (url, filename) => {
    window.open(`${API_BASE_URL}${url}`, '_blank');
  };

  const handleView = (url) => {
    window.open(`${API_BASE_URL}${url}`, '_blank');
  };

  return (
    <div className="cv-results-container">
      <div className="results-header">
        <h2>✅ Your CVs are Ready!</h2>
        <p>20 different CV templates have been generated in both PDF and DOCX formats.</p>
        <button onClick={onReset} className="reset-btn">
          ← Create New CV
        </button>
      </div>

      <div className="cv-grid">
        {cvs.map((cv) => (
          <div key={cv.templateId} className="cv-card">
            <div className="cv-card-header">
              <h3>Template {cv.templateId}</h3>
              <span className="template-badge">{cv.templateName}</span>
            </div>

            <div className="cv-card-preview">
              <div className="preview-placeholder">
                <span className="preview-icon">📄</span>
                <p>CV Template {cv.templateId}</p>
              </div>
            </div>

            <div className="cv-card-actions">
              <div className="format-section">
                <h4>PDF Format</h4>
                <div className="action-buttons">
                  <button
                    onClick={() => handleView(cv.pdf.viewUrl)}
                    className="view-btn"
                  >
                    👁️ View
                  </button>
                  <button
                    onClick={() => handleDownload(cv.pdf.downloadUrl, cv.pdf.filename)}
                    className="download-btn"
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>

              <div className="format-section">
                <h4>DOCX Format</h4>
                <div className="action-buttons">
                  <button
                    onClick={() => handleView(cv.docx.viewUrl)}
                    className="view-btn"
                  >
                    👁️ View
                  </button>
                  <button
                    onClick={() => handleDownload(cv.docx.downloadUrl, cv.docx.filename)}
                    className="download-btn"
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="results-footer">
        <p className="tip">
          💡 Tip: Try different templates to find the one that best suits your style!
        </p>
        <button onClick={onReset} className="reset-btn-large">
          Create Another CV
        </button>
      </div>
    </div>
  );
};

export default CVResults;
