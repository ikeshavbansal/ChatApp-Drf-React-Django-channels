import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from "../services/AuthService";

const useAxiosWithInterceptor = () => {
    const jwtAxios = axios.create({});
    const navigate = useNavigate();
    const { logout } = useAuthService()

    jwtAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            console.log(error.response.status,"=======")
            if (error.response.status === 401 || error.response.status === 403) {
                axios.defaults.withCredentials = true;
         
                  try {
                    const response = await axios.post(
                      "http://127.0.0.1:8080/api/token/refresh/"
                    );
                    if (response["status"] == 200) {
                      return jwtAxios(originalRequest);
                    }
                  } catch (refreshError) {
                    logout()
                    const goLogin = () => navigate("/login");
                    goLogin();
                    return Promise.reject(refreshError);
                  }
                
              }
              return Promise.reject(error);
        }
    );
    
    return jwtAxios;
};

export default useAxiosWithInterceptor;