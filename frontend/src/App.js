import React, { useState } from 'react';
import './App.css';
import CVForm from './components/CVForm';
import CVResults from './components/CVResults';

function App() {
  const [generatedCVs, setGeneratedCVs] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCVGenerated = (cvs) => {
    setGeneratedCVs(cvs);
  };

  const handleReset = () => {
    setGeneratedCVs(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📄 Professional CV Generator</h1>
        <p>Create your perfect CV in multiple formats</p>
      </header>

      <main className="App-main">
        {!generatedCVs ? (
          <CVForm 
            onCVGenerated={handleCVGenerated} 
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <CVResults 
            cvs={generatedCVs} 
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="App-footer">
        <p>&copy; 2026 CV Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
