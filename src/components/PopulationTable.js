import React, { useEffect, useState } from 'react';
import { fetchPopulationDataByPrefecture, fetchPrefectures } from '../services/resasService';
import '../css/styles.css';

const PopulationTable = () => {
  const [populationData, setPopulationData] = useState({});
  const [prefectures, setPrefectures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prefecturesResponse = await fetchPrefectures();
        setPrefectures(prefecturesResponse);

        const populationData = {};
        for (const prefecture of prefecturesResponse) {
          const data = await fetchPopulationDataByPrefecture(prefecture.prefCode);
          populationData[prefecture.prefName] = data;
        }
        setPopulationData(populationData);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const ageGroups = [
    "年少人口", // Young population
    "生産年齢人口", // Working-age population
    "老年人口" // Elderly population
  ];

  return (
    <div className="container"> {/* Ensure PopulationTable is within .container */}
      <div className="population-table-container">
        <table>
          <thead>
            <tr>
              <th>Age Group</th>
              {prefectures.map(prefecture => (
                <th key={prefecture.prefCode}>{prefecture.prefName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ageGroups.map(ageGroup => (
              <tr key={ageGroup}>
                <td>{ageGroup}</td>
                {prefectures.map(prefecture => (
                  <td key={prefecture.prefCode}>
                    {populationData[prefecture.prefName]?.find(data => data.label === ageGroup)?.data[0]?.value || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopulationTable;
