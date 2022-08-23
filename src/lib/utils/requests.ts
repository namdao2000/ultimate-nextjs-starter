import axios from 'axios';

// Handle all errors and axios configuration in one place.

export const requests = axios.create();
requests.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('here it is', error);
  }
);
