import { useAuth } from "../../../context/AuthContext";

const Message = ({ message }) => {
  const [authState] = useAuth();
  const itsme = message?.senderId === authState?.user?._id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "chat-bubble-info" : "chat-bubble-success";
  return (
    <>
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
      </div>
    </>
  );
};

export default Message;
