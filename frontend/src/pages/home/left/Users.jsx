import Loading from "../../../components/loading/Loading";
import userGetAllUsers from "../../../hooks/useGetAllUsers";
import User from "./User";

const Users = () => {
  const { allUsers, loading } = userGetAllUsers();
  return (
    <>
      {loading ? (
        <Loading />
      ) : allUsers?.filterUser?.length > 0 ? (
        allUsers?.filterUser?.map((item) => <User item={item} key={item._id} />)
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
};

export default Users;
