import useConversation from "../../../store/conversation";

const ChatUser = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="bg-slate-800">
      {selectedConversation && (
        <div className="flex items-center gap-1 w-full p-2 justify-end">
          <div className="flex items-center gap-1">
            <span>to:</span>
            <h1>{selectedConversation?.name}</h1>
          </div>
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img src={selectedConversation?.avatar} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatUser;
