import { useState, useEffect } from 'react';
import { getFilteredGemPostDataApi } from '../api';
import logger from '../logger';

function useFilteredGemPostData(field, type, dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    getFilteredGemPostDataApi(field, type)
      .then(res => {
        logger.info('getFilteredGemPostDataApi', res);
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        logger.error('getFilteredGemPostDataApiError', err);
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

export default useFilteredGemPostData;
