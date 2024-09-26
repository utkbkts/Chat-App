import { useEffect, useState } from "react";
import axiosInstance from "../libs/Axios";
import toast from "react-hot-toast";

const userGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/user`);
        setAllUsers(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { allUsers, loading };
};

export default userGetAllUsers;
