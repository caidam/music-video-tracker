import { useState, useEffect } from 'react';
import useAxios from '@/utils/useAxios';

export const useModeledData = (endpoint, sourceId) => {
  const [modeledData, setModeledData] = useState([]);
  const [modeledDataUpdateNeeded, setModeledDataUpdateNeeded] = useState(true);
  const api = useAxios();

  useEffect(() => {
    const getModeledData = async () => {
      try {
        const response = await api.get(`${endpoint}/${sourceId}`);
        if (response.status === 200) {
          console.log('Data fetched successfully:', response.data);
          setModeledData(response.data);
          setModeledDataUpdateNeeded(false); // Reset the flag after fetching
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    if (modeledDataUpdateNeeded) {
      getModeledData();
    }
  }, [modeledDataUpdateNeeded, endpoint, sourceId, api]);

  return [modeledData, setModeledData, setModeledDataUpdateNeeded]; // Return an array
};
