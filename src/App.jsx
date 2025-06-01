import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");

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
      console.log(response);
      setLink(response.data[0].link);
      setStatus(`✅ Success: ${response.data.transcription || "Uploaded successfully"}`);
    } catch (error) {
      setStatus(`❌ Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {link === "" ? (
        <div className="flex justify-center items-center h-full w-full">
          <div className="flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4">
            <h2 className="text-lg text-center font-semibold text-gray-800 dark:text-gray-100">Upload a Video File</h2>

            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m5 4h3m-3 0v6m0-6h-3m3 0h3m-6 6h.01M6 16h.01"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP4 Only • Max 100MB</p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="video/*,audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button
              onClick={handleUpload}
              disabled={!file}
              className={`w-full px-4 py-2 text-white rounded-md transition ${
                file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              {file ? "Upload File" : "Select a file first"}
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">{status}</div>
          </div>
        </div>
      ) : (
        <div className="flex h-full justify-center items-center py-6">
          <div className="rounded-2xl shadow-lg overflow-hidden max-w-[90vw] w-full sm:w-[640px]">
            <video controls className="w-full h-auto rounded-2xl" poster="/thumbnail.jpg">
              <source src={link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
