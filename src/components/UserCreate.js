import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { userCreate } from "../api/api";

function UserCreate() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirm_password,
    };

    setLoader(true);

    try {
      const response = await userCreate(formData);
      if (response.data.success === true) {
        navigate("/users");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors: backendErrors } = error.response.data;
        Object.keys(backendErrors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: backendErrors[key][0]
          });
        });
      } else {
        console.error("Error:", error);
      }
    } finally {
      setLoader(false);
    }
  };

  const password = watch("password");

  return (
    <div className="p-2 flex items-center justify-center w-full h-[100vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 w-[500px] border border-gray-300 flex-col rounded-md p-6 shadow-md"
      >
        <div>
          <label className="text-black mb-2 block text-base capitalize">
            Name
          </label>
          <input
            className="w-full py-2 px-4 border rounded border-gray-300"
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label className="text-black mb-2 block text-base capitalize">
            Email
          </label>
          <input
            className="w-full py-2 px-4 border rounded border-gray-300"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="text-black mb-2 block text-base capitalize">
            Password
          </label>
          <input
            type="password"
            className="w-full py-2 px-4 border rounded border-gray-300"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div>
          <label className="text-black mb-2 block text-base capitalize">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full py-2 px-4 border rounded border-gray-300"
            {...register("confirm_password", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm Password"
          />
          {errors.confirm_password && (
            <span className="text-red-500">
              {errors.confirm_password.message}
            </span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-800 text-white rounded"
            disabled={loader}
          >
            {loader ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      {loader && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
    </div>
  );
}

export default UserCreate;
