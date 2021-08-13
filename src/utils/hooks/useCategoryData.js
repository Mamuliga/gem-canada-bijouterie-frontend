import { useState, useEffect } from 'react';
import { getCategoryDataApi } from '../api';
import logger from '../logger';

function useCategoryData(dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    getCategoryDataApi()
      .then((res) => {
        logger.info('getCategoryDataApi', res);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        logger.error('getCategoryDataApi', err);
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(callApi, dependencyArr);

  return {
    loading,
    error,
    data,
  };
}

export default useCategoryData;
