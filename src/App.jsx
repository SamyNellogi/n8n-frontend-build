import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Uploading...');
      const response = await axios.post(
        'https://bl4dee.app.n8n.cloud/webhook-test/upload-video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setStatus(`✅ Success: ${response.data.transcription || 'Uploaded successfully'}`);
    } catch (error) {
      setStatus(`❌ Upload failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Upload a Video File</h2>
      <input type="file" accept="video/*,audio/*" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      <br /><br />
      <div>{status}</div>
    </div>
  );
}

export default App;