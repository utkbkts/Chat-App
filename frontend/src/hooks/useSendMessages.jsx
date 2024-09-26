import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/conversation";
import axiosInstance from "../libs/Axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedConversation?._id}`,
        message
      );
      const data = await res.data;
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
