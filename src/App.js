import React, { useState } from 'react';
import PopulationTable from './components/PopulationTable';
import FriendshipUploader from './components/FriendshipUploader';
import { groupPrefectures } from './utils/groupingAlgorithm';

const App = () => {
  const [friendshipData, setFriendshipData] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleFileLoaded = (data) => {
    setFriendshipData(data);
    const grouped = groupPrefectures(data);
    setGroups(grouped);
  };

  return (
    <div className="App">
      <h1>Population Data</h1>
      <PopulationTable groups={groups} />
      <h2>Upload Friendship CSV</h2>
      <FriendshipUploader onFileLoaded={handleFileLoaded} />
    </div>
  );
};

export default App;
