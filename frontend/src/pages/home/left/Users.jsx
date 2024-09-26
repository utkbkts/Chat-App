const Users = () => {
  return (
    <div className=" space-x-4 py-2 px-4 gap-1 hover:bg-slate-800 cursor-pointer duration-300 flex">
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="flex flex-col gap-1 ">
        <h1 className="whitespace-nowrap">Utku Bektasoglu</h1>
        <span>@utkus</span>
      </div>
    </div>
  );
};

export default Users;
