import { useState, useEffect } from 'react';
import { getPostDataApi } from '../api';
import logger from '../logger';

function usePostData(postId, dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    getPostDataApi(postId)
      .then(res => {
        logger.info('getPostDataApi', res);
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        logger.error('getPostDataApi', err);
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

export default usePostData;
