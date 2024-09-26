import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../libs/Axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../../validation/RegisterSchema";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/login`,
        values
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full  p-8 space-y-6 bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 max-w-xl  shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              {...register("username")}
              className="input input-bordered w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              {...register("password")}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
