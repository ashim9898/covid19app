import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/reducers/tokenSlice";

export const useAxiosInstance = () => {
    const dispatch = useDispatch()
    const {accessToken} = useSelector(state => state.token);
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
      });
    
      axiosInstance.interceptors.request.use(
        (config) => {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    
      axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalConfig = error.config;
    
          if (originalConfig.url !== "/refresh-token" && error.response) {
            // Access Token was expired
            if (error.response.status === 401 && !originalConfig._retry) {
              originalConfig._retry = true;
    
              try {
                const response = await axiosInstance.post("/refresh-token", {
                  refreshToken: localStorage.getItem('refreshToken'),
                });
    
                const { accessToken } = response.data;
                  dispatch(setToken(accessToken));
    
                originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
    
                return axiosInstance(originalConfig);
    
              } catch (_error) {
             
                window.location.href = '/signin';
                return Promise.reject(_error);
              }
            }
          }
    
          return Promise.reject(error);
        }
      );

      return {
        axiosInstance
      }
}