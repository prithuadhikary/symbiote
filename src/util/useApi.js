import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = () => {
  const [loading, setLoading] = useState(false);

  // Fetch the token (from localStorage or any other state management solution)
  const token = localStorage.getItem('authToken'); // Replace with your token fetching logic

  // Create an axios instance with default config
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Replace with your API's base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add token to the authorization header if available
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  // Generic API request handler
  const request = useCallback(
    async (method, url, data = null) => {
      setLoading(true);

      try {
        const response = await axiosInstance({
          method,
          url,
          data,
        });
        return response.data; // Return data on success
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance]
  );

  // Helper functions for different request types
  const get = useCallback((url) => request('GET', url), [request]);
  const post = useCallback((url, data) => request('POST', url, data), [request]);
  const put = useCallback((url, data) => request('PUT', url, data), [request]);
  const del = useCallback((url) => request('DELETE', url), [request]);

  return {
    get,
    post,
    put,
    del,
    loading
  };
};

export default useApi;