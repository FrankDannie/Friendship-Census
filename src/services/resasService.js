import axios from 'axios';

const API_KEY = 'uhVxcOI4BDuCuE7RKLrl1eumVL89Q93LtFy495Zz'; // Replace with your actual API key
const BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';

export const fetchPopulationData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/population/composition/perYear`, {
      headers: { 'X-API-KEY': API_KEY },
      params: { prefCode: 1, cityCode: '-' }
    });
    console.log(response); // Log the response to check its structure
    if (response.data && response.data.result && response.data.result.data) {
      return response.data.result.data[0].data;
    } else {
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('Error fetching population data:', error);
    throw error;
  }
};
export const fetchPrefectures = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/prefectures`, {
      headers: { 'X-API-KEY': API_KEY }
    });

    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('Error fetching prefectures:', error);
    throw error;
  }
};