import axios from 'axios';

// Handle all errors and axios configuration in one place.

// For everything BUT get requests, use this.
export const requests = axios.create();
requests.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('Do something with this error', error);
  }
);

// For get requests using SWR
export const fetcher = (url: string) => fetch(url).then((r) => r.json());
