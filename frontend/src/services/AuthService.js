import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function useAuthService() {
    const navigate = useNavigate()

const getInitialLoggedInValue = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn !== null && loggedIn === "true";
};

const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoggedInValue);
    
const getUserDetails = async () =>{
    try {
        const userId = localStorage.getItem("user_id")
        const response = await axios.get(
            `http://127.0.0.1:8080/api/account/?user_id=${userId}`,
            {
                withCredentials: true
            }
        );
        const userDetails = response.data
        localStorage.setItem("username", userDetails.username);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true")
    } catch (err) {
        setIsLoggedIn(false)
        localStorage.setItem("isLoggedIn", "false")
        return err;
    }
}

const login = async (username, password) =>{
    try {
        const response = await axios.post(
            "http://127.0.0.1:8080/api/token/", {
                username,
                password,
        }, { withCredentials: true }
        );

        const user_id = response.data.user_id
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user_id", user_id)
        setIsLoggedIn(true)

        getUserDetails()

    } catch (err) {
        return err.response.status;
    }
}

const refreshAccessToken = async () => {
    try {
        await axios.post(
            `${BASE_URL}/token/refresh/`, {} , {withCredentials:true}
        )
    } catch (refreshError) {
        return Promise.reject(refreshError)
    }
}
const register = async (username, password) =>{
    try {
        const response = await axios.post(
            "http://127.0.0.1:8080/api/register/", {
                username,
                password,
        }, { withCredentials: true }
        );
        return response.status
    } catch (err) {
        return err.response.status;
    }
}


const logout = async () => {
    localStorage.setItem("isLoggedIn", "false")
    localStorage.removeItem("user_id")
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login")

    try {
        await axios.post(
            `${BASE_URL}/logout/`, {} , {withCredentials:true}
        )
    } catch (refreshError) {
        return Promise.reject(refreshError)
    }

}

return {login, isLoggedIn, logout, refreshAccessToken, register}
   
} 