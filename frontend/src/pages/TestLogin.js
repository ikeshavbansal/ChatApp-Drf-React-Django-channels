import axios from "axios";
import { useState } from "react";
import { useAuthServiceContext } from "../context/AuthContext";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor.js";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const [username, setUsername] = useState("");
  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      
      const response = await jwtAxios.get(
        `http://127.0.0.1:8080/api/account/?user_id=1`,
        {
        withCredentials: true 
      }
      );
      const userDetails = response.data;
      setUsername(userDetails.username);
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={getUserDetails}>Get User Details</button>
      </div>
      <div>Username: {username}</div>
    </>
  );
};

export default TestLogin;
