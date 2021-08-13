import { useState, useEffect } from 'react';
import { getGemPostDataApi } from '../api';
import logger from '../logger';

function useGemPostData(dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    getGemPostDataApi()
      .then((res) => {
        logger.info('getGemPostDataApi', res);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        logger.error('getGemPostDataApi', err);
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

export default useGemPostData;
