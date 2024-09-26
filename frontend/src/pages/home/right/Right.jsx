import ChatUser from "./ChatUser";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const Right = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatUser />
      <div className="overflow-y-auto flex-grow">
        <Messages />
      </div>
      <SendMessage />
    </div>
  );
};

export default Right;
