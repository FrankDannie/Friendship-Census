export const groupPrefectures = (friendshipData) => {
  const n = friendshipData.length;
  const friendshipLevels = {};

  // Parse the CSV data to create the friendship levels matrix
  const headers = Object.keys(friendshipData[0]); 

  for (let i = 0; i < n; i++) {
    const row = friendshipData[i];
    const pref1 = row.x; // Assuming 'x' is the key for prefecture names in each row
    friendshipLevels[pref1] = {};

    for (let j = 1; j < headers.length; j++) {
      const pref2 = headers[j];
      if (row[pref2] !== '-') {
        friendshipLevels[pref1][pref2] = parseInt(row[pref2], 10);
      }
    }
  }

  // Implement the grouping algorithm to maximize friendship levels
  const groups = [];

  // A utility function to calculate the total friendship level of a group
  const calculateGroupFriendship = (group) => {
    let totalFriendship = 0;
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        totalFriendship += friendshipLevels[group[i]][group[j]] || 0;
      }
    }
    return totalFriendship;
  };

  // Find all best groups by trying all combinations (since the number of groups is small)
  const findBestGroups = () => {
    const allPrefectures = Object.keys(friendshipLevels);
    let bestGroups = [];
    let maxFriendship = -Infinity;

    // Generate combinations of up to 3 prefectures
    for (let i = 0; i < allPrefectures.length; i++) {
      for (let j = i + 1; j < allPrefectures.length; j++) {
        for (let k = j + 1; k < allPrefectures.length; k++) {
          const currentGroup = [allPrefectures[i], allPrefectures[j], allPrefectures[k]];
          const currentFriendship = calculateGroupFriendship(currentGroup);

          if (currentFriendship > maxFriendship) {
            bestGroups = [currentGroup];
            maxFriendship = currentFriendship;
          } else if (currentFriendship === maxFriendship) {
            bestGroups.push(currentGroup);
          }
        }
      }
    }

    return bestGroups;
  };

  const bestGroups = findBestGroups();
  groups.push(...bestGroups);
  return groups;
};
