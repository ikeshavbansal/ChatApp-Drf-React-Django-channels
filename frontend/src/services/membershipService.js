import { useState } from "react";
import useAxiosWithJwtInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";
import axios from "axios";

const useMembership = () => {
  const jwtAxios = useAxiosWithJwtInterceptor();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserMember, setIsUserMember] = useState(false);

  const joinServer = async (serverId) => {
    setIsLoading(true);
    try {
      await jwtAxios.post(`${BASE_URL}/membership/${serverId}/membership/`, {}, { withCredentials: true });
      setIsLoading(false);
      setIsUserMember(true);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  const leaveServer = async (serverId) => {
    setIsLoading(true);
    try {
      await jwtAxios.delete(`${BASE_URL}/membership/${serverId}/membership/remove_member/`, { withCredentials: true });
      setIsLoading(false);
      setIsUserMember(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  const isMember = async (serverId) => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}/membership/${serverId}/membership/is_member/`, { withCredentials: true });
      setIsLoading(false);
      setIsUserMember(response.data.is_member);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { joinServer, leaveServer, error, isLoading, isMember, isUserMember };
};

export default useMembership;
