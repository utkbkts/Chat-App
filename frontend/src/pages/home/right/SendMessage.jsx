import { Send } from "lucide-react";
const SendMessage = () => {
  return (
    <form className="flex items-center ">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        <Send className="absolute right-2 inset-y-0 top-3" />
      </div>
    </form>
  );
};

export default SendMessage;
