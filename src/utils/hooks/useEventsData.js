import { useState, useEffect } from 'react';
import { getEventsDataApi } from '../api';
import logger from '../logger';

function useEventsData(dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    getEventsDataApi()
      .then((res) => {
        logger.info('getEventsDataApi', res);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        logger.error('getEventsDataApi', err);
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

export default useEventsData;
