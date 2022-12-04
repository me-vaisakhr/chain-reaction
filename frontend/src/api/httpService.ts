import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const { REACT_APP_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
  withCredentials: true,
});

// instance.interceptors.request.use(onRequestSuccess, onRequestFail);

// instance.interceptors.response.use(onResponseSuccess, onResponseFail);
export default instance;
