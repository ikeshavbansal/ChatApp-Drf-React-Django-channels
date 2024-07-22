import useAxiosWithInterceptor from "../helpers/jwtinterceptor.ts";
import { BASE_URL } from "../config";
import { useState } from "react";

const useCrud = (initialData, API_URL) => {
  const jwtAxios = useAxiosWithInterceptor();
  const [dataCRUD, setDataCRUD] = useState(initialData);
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}/${API_URL}`);
      const data = response.data;
      setDataCRUD(data);
      setError(null);
      setIsloading(false);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(new Error("400"));
      }
      setIsloading(false);
      throw error;
    }
  };

  return { dataCRUD, fetchData, error, isloading };
};

export default useCrud;