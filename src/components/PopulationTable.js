import React, { useEffect, useState } from 'react';
import { fetchPopulationData, fetchPrefectures } from '../services/resasService';
import '../css/styles.css';

const PopulationTable = () => {
  const [populationData, setPopulationData] = useState([]);
  const [prefectures, setPrefectures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const populationResponse = await fetchPopulationData();
        const prefecturesResponse = await fetchPrefectures();

        setPopulationData(populationResponse);
        setPrefectures(prefecturesResponse);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // Extract years and sort in descending order
  const years = [...new Set(populationData.map((data) => data.year))].sort((a, b) => b - a);

  return (
    <div className="population-table-container">
      <div className="years-table">
        <table>
          <thead>
            <tr>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {years.map((year) => (
              <tr key={year}>
                <td>{year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="prefectures-table">
        <table>
          <thead>
            <tr>
              <th>Prefecture Names</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {prefectures.map((prefecture) => (
                <td key={prefecture.prefCode}>{prefecture.prefName}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopulationTable;
