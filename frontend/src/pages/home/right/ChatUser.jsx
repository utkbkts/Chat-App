const ChatUser = () => {
  return (
    <div className="bg-slate-800">
      <div className="flex items-center gap-1 w-full p-2 justify-end">
        <div className="flex items-center gap-1">
          <span>to:</span>
          <h1>selena</h1>
        </div>
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
