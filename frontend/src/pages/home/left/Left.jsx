import Logout from "./Logout";
import Search from "./Search";
import Users from "./Users";

const Left = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex-grow">
        <h1 className="font-bold text-3xl py-2 px-5">Chat</h1>
        <Search />
        <hr />
        <div className="">
          <Users />
        </div>
      </div>
      <div className="">
        <Logout />
      </div>
    </div>
  );
};

export default Left;
