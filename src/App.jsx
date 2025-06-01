import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const [editFile, setEditFile] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editDownloadUrl, setEditDownloadUrl] = useState(null);

  const handleEditUpload = async () => {
    if (!editFile) {
      setEditStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", editFile);

    try {
      setEditStatus("Uploading for editing...");
      const response = await axios.post("https://your-backend-or-n8n-url.com/edit-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      setEditDownloadUrl(url);
      setEditStatus("✅ Edited file ready.");
    } catch (err) {
      setEditStatus(`❌ Failed to process: ${err.message}`);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const response = await axios.post("https://bl4dee.app.n8n.cloud/webhook-test/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus(`✅ Success: ${response.data.transcription || "Uploaded successfully"}`);
    } catch (error) {
      setStatus(`❌ Upload failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🎤 Transcribe a Video or Audio File</h2>
      <input type="file" accept="video/*,audio/*" onChange={handleFileChange} />
      <br />
      <br />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      <br />
      <br />
      <div>{status}</div>
      <hr style={{ margin: "3rem 0" }} />

      <h2>🎬 Upload a Video for Editing</h2>
      <input type="file" accept="video/*" onChange={(e) => setEditFile(e.target.files[0])} />
      <br />
      <br />
      <button onClick={handleEditUpload} disabled={!editFile}>
        Upload for Processing
      </button>
      <br />
      <br />
      <div>{editStatus}</div>
      {editDownloadUrl && (
        <div style={{ marginTop: "1rem" }}>
          <a href={editDownloadUrl} download="edited-video.mp4">
            ⬇️ Download Edited Video
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
