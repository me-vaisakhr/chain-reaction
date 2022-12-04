import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const { REACT_APP_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: 'http://localhost:8888/',
  withCredentials: true,
});

// instance.interceptors.request.use(onRequestSuccess, onRequestFail);

// instance.interceptors.response.use(onResponseSuccess, onResponseFail);
export default instance;
