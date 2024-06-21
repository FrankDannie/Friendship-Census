import React, { useEffect, useState } from 'react';
import { fetchPopulationDataByPrefecture, fetchPrefectures } from '../services/resasService';
import '../css/styles.css';

const PopulationTable = ({ groups }) => {
  const [populationData, setPopulationData] = useState({});
  const [prefectures, setPrefectures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div className="loading-symbol">Loading...</div>;
  }

  const getYears = () => {
    const years = new Set();
    Object.values(populationData).forEach(prefData => {
      prefData[0].data.forEach(entry => {
        years.add(entry.year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  const years = getYears();

  const normalizeName = (name) => {
    return name.trim().replace(/,$/, '');
  };

  const isHighlighted = (prefecture) => {
    const normalizedPrefecture = normalizeName(prefecture).toLowerCase();
    const highlighted = groups.some(group => {
      const groupNormalized = group.map(name => normalizeName(name).toLowerCase());
      console.log("Comparing", normalizedPrefecture, "with group", groupNormalized);
      return groupNormalized.includes(normalizedPrefecture);
    });
    if (highlighted) {
      console.log("Highlighting prefecture:", normalizedPrefecture);
    } else {
      console.log("Not highlighting prefecture:", normalizedPrefecture);
    }
    return highlighted;
  };

  return (
    <div className="container">
      <div className="population-table-container">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              {prefectures.map(prefecture => (
                <th
                  key={prefecture.prefCode}
                  className={isHighlighted(prefecture.prefName) ? 'highlighted' : ''}
                >
                  {prefecture.prefName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {years.map(year => (
              <tr key={year}>
                <td>{year}</td>
                {prefectures.map(prefecture => (
                  <td
                    key={prefecture.prefCode}
                    className={isHighlighted(prefecture.prefName) ? 'highlighted' : ''}
                  >
                    {populationData[prefecture.prefName][0].data.find(entry => entry.year === year)?.value || 0}
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
