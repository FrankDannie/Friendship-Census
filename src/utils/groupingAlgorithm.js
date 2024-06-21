export const groupPrefectures = (friendshipData) => {
  const n = friendshipData.length;
  const friendshipLevels = {};

  // Parse the CSV data to create the friendship levels matrix
  const headers = Object.keys(friendshipData[0]);
  const prefectures = headers.slice(1);

  for (let i = 0; i < n; i++) {
    const row = friendshipData[i];
    const pref1 = row.x;
    friendshipLevels[pref1] = {};

    for (let j = 1; j < headers.length; j++) {
      const pref2 = headers[j];
      if (row[pref2] !== '-') {
        friendshipLevels[pref1][pref2] = parseInt(row[pref2], 10);
      }
    }
  }

  const calculateGroupFriendship = (group) => {
    let totalFriendship = 0;
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        totalFriendship += (friendshipLevels[group[i]][group[j]] || 0) + (friendshipLevels[group[j]][group[i]] || 0);
      }
    }
    return totalFriendship;
  };

  const findBestGroups = () => {
    const allPrefectures = Object.keys(friendshipLevels);
    const allGroups = [];

    for (let i = 0; i < allPrefectures.length; i++) {
      for (let j = i + 1; j < allPrefectures.length; j++) {
        for (let k = j + 1; k < allPrefectures.length; k++) {
          const currentGroup = [allPrefectures[i], allPrefectures[j], allPrefectures[k]].filter(pref => pref);
          const currentFriendship = calculateGroupFriendship(currentGroup);
          allGroups.push({ group: currentGroup, friendship: currentFriendship });
        }
      }
    }

    // Sort groups by friendship level in descending order
    allGroups.sort((a, b) => b.friendship - a.friendship);
    console.log(allGroups)

    // Get the top 3 groups
    return allGroups.slice(0, 3).map(group => group.group);
  };

  try {
    return findBestGroups();
  } catch (error) {
    console.error('Error in grouping algorithm:', error);
    return [];
  }
};
