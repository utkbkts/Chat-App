import { Send } from "lucide-react";
import useSendMessage from "../../../hooks/useSendMessages";
import { useState } from "react";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage({ message });
      setMessage("");
    }
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit">
          <Send className="absolute right-2 inset-y-0 top-3" />
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
