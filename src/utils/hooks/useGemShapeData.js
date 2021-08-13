import { useState, useEffect } from 'react';
import {getGemShapeDataApi  } from '../api';
import logger from '../logger';

function useGemShapeData(dependencyArr = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = () => {
    setLoading(true);

    getGemShapeDataApi()
      .then((res) => {
        logger.info('getGemShapeDataApi', res);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        logger.error('getGemShapeDataApi', err);
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

export default useGemShapeData;
