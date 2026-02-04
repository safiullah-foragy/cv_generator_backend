// Define 10 different CV template styles
const templates = [
  {
    id: 1,
    name: 'Professional Classic',
    description: 'A clean, traditional CV format suitable for corporate positions',
    style: {
      primaryColor: '#2c3e50',
      secondaryColor: '#34495e',
      accentColor: '#3498db',
      fontFamily: 'Arial, sans-serif',
      layout: 'single-column'
    }
  },
  {
    id: 2,
    name: 'Modern Blue',
    description: 'Contemporary design with blue accents for tech and creative roles',
    style: {
      primaryColor: '#1e3a8a',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      fontFamily: 'Helvetica, sans-serif',
      layout: 'two-column'
    }
  },
  {
    id: 3,
    name: 'Executive Elite',
    description: 'Sophisticated layout for senior-level positions',
    style: {
      primaryColor: '#1f2937',
      secondaryColor: '#4b5563',
      accentColor: '#d97706',
      fontFamily: 'Georgia, serif',
      layout: 'single-column'
    }
  },
  {
    id: 4,
    name: 'Creative Bold',
    description: 'Eye-catching design for creative professionals',
    style: {
      primaryColor: '#7c3aed',
      secondaryColor: '#a78bfa',
      accentColor: '#c4b5fd',
      fontFamily: 'Verdana, sans-serif',
      layout: 'two-column'
    }
  },
  {
    id: 5,
    name: 'Minimalist Green',
    description: 'Clean and eco-friendly design with green tones',
    style: {
      primaryColor: '#065f46',
      secondaryColor: '#059669',
      accentColor: '#10b981',
      fontFamily: 'Arial, sans-serif',
      layout: 'single-column'
    }
  },
  {
    id: 6,
    name: 'Corporate Gray',
    description: 'Professional gray-toned design for business roles',
    style: {
      primaryColor: '#374151',
      secondaryColor: '#6b7280',
      accentColor: '#9ca3af',
      fontFamily: 'Calibri, sans-serif',
      layout: 'two-column'
    }
  },
  {
    id: 7,
    name: 'Tech Orange',
    description: 'Dynamic orange theme perfect for tech startups',
    style: {
      primaryColor: '#c2410c',
      secondaryColor: '#ea580c',
      accentColor: '#fb923c',
      fontFamily: 'Arial, sans-serif',
      layout: 'single-column'
    }
  },
  {
    id: 8,
    name: 'Academic Formal',
    description: 'Traditional format ideal for academic positions',
    style: {
      primaryColor: '#1e293b',
      secondaryColor: '#475569',
      accentColor: '#64748b',
      fontFamily: 'Times New Roman, serif',
      layout: 'single-column'
    }
  },
  {
    id: 9,
    name: 'Elegant Purple',
    description: 'Sophisticated purple design for standout applications',
    style: {
      primaryColor: '#581c87',
      secondaryColor: '#7e22ce',
      accentColor: '#a855f7',
      fontFamily: 'Helvetica, sans-serif',
      layout: 'two-column'
    }
  },
  {
    id: 10,
    name: 'Fresh Teal',
    description: 'Modern teal theme for a fresh, professional look',
    style: {
      primaryColor: '#0f766e',
      secondaryColor: '#14b8a6',
      accentColor: '#2dd4bf',
      fontFamily: 'Arial, sans-serif',
      layout: 'two-column'
    }
  }
];

exports.getAllTemplates = () => {
  return templates;
};

exports.getTemplate = (id) => {
  return templates.find(t => t.id === parseInt(id));
};

exports.getTemplateCount = () => {
  return templates.length;
};
