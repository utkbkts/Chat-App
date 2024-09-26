import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../libs/Axios";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useAuth();

  const logout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/logout");

      localStorage.removeItem("user");
      setAuthState(null);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
