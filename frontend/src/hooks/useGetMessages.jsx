import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/conversation";
import axiosInstance from "../libs/Axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/message/${selectedConversation._id}`
        );
        const data = await res.data;
        setMessages(data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
