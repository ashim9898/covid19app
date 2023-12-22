import axios from "axios";
import {useSelector} from 'react-redux'



const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
 
});



axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); 

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
  (response) => { return response},
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
          localStorage.setItem('accessToken', accessToken);

          originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
         

          return axiosInstance(originalConfig);
          
        } catch (_error) {
          localStorage.removeItem('accessToken')
          window.location.href = '/signin';
          return Promise.reject(_error);
         
        }
      }
    }

  
    return Promise.reject(error);
  }
);





export { axiosInstance }