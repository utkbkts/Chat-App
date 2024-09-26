import useConversation from "../../../store/conversation";

const User = ({ item }) => {
  const { avatar, gender, name, username, _id } = item;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === _id;
  return (
    <div
      className={`space-x-4 py-2 px-4 gap-1 hover:bg-slate-800 cursor-pointer duration-300 flex ${
        isSelected ? "bg-slate-800" : ""
      }`}
      onClick={() => setSelectedConversation(item)}
    >
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src={avatar} />
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1 ">
          <h1 className="whitespace-nowrap">{name}</h1>
          <span>@{username}</span>
        </div>
        <div>
          {gender} - {gender === "male" ? "🦾" : "👄"}
        </div>
      </div>
    </div>
  );
};

export default User;
