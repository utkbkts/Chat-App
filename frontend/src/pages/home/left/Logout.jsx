import useLogout from "../../../hooks/useLogout";

const Logout = () => {
  const { logout, loading } = useLogout();
  return (
    <button onClick={logout} className="btn btn-error w-full">
      {loading ? "loading..." : "Logout"}
    </button>
  );
};

export default Logout;
