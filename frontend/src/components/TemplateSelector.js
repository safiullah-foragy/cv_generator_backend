import React from 'react';
import './TemplateSelector.css';

const templates = [
  { id: 1, name: 'Professional Blue', color: '#2C3E50', description: 'Classic professional design with header photo' },
  { id: 2, name: 'Modern Green', color: '#27AE60', description: 'Two-column modern layout' },
  { id: 3, name: 'Creative Purple', color: '#8E44AD', description: 'Sidebar design with creative flair' },
  { id: 4, name: 'Bold Red', color: '#E74C3C', description: 'Minimalist centered photo design' },
  { id: 5, name: 'Elegant Orange', color: '#F39C12', description: 'Elegant left-aligned layout' },
  { id: 6, name: 'Clean Teal', color: '#1ABC9C', description: 'Clean modern with top photo' },
  { id: 7, name: 'Minimal Gray', color: '#34495E', description: 'Minimal corner photo design' },
  { id: 8, name: 'Warm Orange', color: '#E67E22', description: 'Timeline style layout' },
  { id: 9, name: 'Fresh Turquoise', color: '#16A085', description: 'Box style with large photo' },
  { id: 10, name: 'Classic Blue', color: '#2980B9', description: 'Traditional centered design' },
  { id: 11, name: 'Vibrant', color: '#D35400', description: 'Vibrant header design' },
  { id: 12, name: 'Corporate', color: '#7F8C8D', description: 'Corporate centered photo' },
  { id: 13, name: 'Executive', color: '#C0392B', description: 'Executive bold design' },
  { id: 14, name: 'Contemporary', color: '#16A085', description: 'Contemporary sidebar' },
  { id: 15, name: 'Artistic', color: '#8E44AD', description: 'Artistic layout' },
  { id: 16, name: 'Professional Dark', color: '#34495E', description: 'Dark professional theme' },
  { id: 17, name: 'Energetic', color: '#D68910', description: 'Energetic orange theme' },
  { id: 18, name: 'Nature', color: '#117A65', description: 'Nature green theme' },
  { id: 19, name: 'Luxury', color: '#6C3483', description: 'Luxury purple theme' },
  { id: 20, name: 'Ocean', color: '#1F618D', description: 'Ocean blue theme' }
];

const TemplateSelector = ({ selectedTemplates, setSelectedTemplates }) => {
  const toggleTemplate = (templateId) => {
    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter(id => id !== templateId));
    } else {
      setSelectedTemplates([...selectedTemplates, templateId]);
    }
  };

  const selectAll = () => {
    setSelectedTemplates(templates.map(t => t.id));
  };

  const clearAll = () => {
    setSelectedTemplates([]);
  };

  return (
    <div className="template-selector-section">
      <div className="selector-header">
        <h2>🎨 Choose CV Templates</h2>
        <p>Select one or more templates to generate ({selectedTemplates.length} selected)</p>
        <div className="selector-actions">
          <button type="button" onClick={selectAll} className="select-all-btn">
            ✅ Select All
          </button>
          <button type="button" onClick={clearAll} className="clear-all-btn">
            ❌ Clear All
          </button>
        </div>
      </div>

      <div className="template-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplates.includes(template.id) ? 'selected' : ''}`}
            onClick={() => toggleTemplate(template.id)}
          >
            <div className="template-preview" style={{ backgroundColor: template.color }}>
              <div className="template-number">#{template.id}</div>
              {selectedTemplates.includes(template.id) && (
                <div className="selected-badge">✓</div>
              )}
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
