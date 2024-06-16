import React, { useState } from 'react';
import Papa from 'papaparse';
import { groupPrefectures } from '../utils/groupingAlgorithm';
import '../css/styles.css';

const FriendshipUploader = () => {
  const [bestGroups, setBestGroups] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      setUploading(true);

      reader.onload = function () {
        const result = reader.result;
        Papa.parse(result, {
          complete: handleFileLoaded,
          header: true,
          encoding: 'Shift-JIS',
        });
      };

      reader.readAsText(selectedFile, 'Shift-JIS');
    }
  };

  const handleFileLoaded = (result) => {
    const friendshipData = result.data;
    const calculatedGroups = groupPrefectures(friendshipData);
    setBestGroups(calculatedGroups);
    setUploading(false);
  };

  return (
    <div className="friendship-uploader">
      <div className="upload-section">
        <label htmlFor="file-upload" className="choose-file-label">
          Choose File:
        </label>
        <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} disabled={uploading} />
      </div>
      <button className="upload-button" onClick={handleFileUpload} disabled={uploading || !selectedFile}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      {bestGroups.length > 0 && (
        <div className="result-section">
          <h3>Best Groups:</h3>
          <ul>
            {bestGroups.map((group, index) => (
              <li key={index}>{group.join(', ')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FriendshipUploader;
