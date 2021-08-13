import { useState, useEffect } from 'react';
import { getAboutDataApi } from '../api';
import logger from '../logger';

function useAboutData(dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    getAboutDataApi()
      .then((res) => {
        logger.info('getAboutDataApi', res);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        logger.error('getAboutDataApi', err);
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

export default useAboutData;
