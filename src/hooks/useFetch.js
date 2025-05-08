import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const cleanError = 2000;

export const useFetch = ({ headers, url, method, datos = null, autoFetch = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const config = {
        method,
        url,
        headers
      };

      // Solo agregamos data al objeto de configuración si hay datos
      if (datos !== null) {
        config.data = datos;
      }

      const response = await axios(config);
      setData(response.data);
    } catch (error) {
      setError(true);
      console.error(error);
      setTimeout(() => {
        setError(false);
      }, cleanError);
    } finally {
      setLoading(false);
    }
  }, [method, headers, url, datos]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [ autoFetch ]);

  return { data, loading, error, fetchData }
};
