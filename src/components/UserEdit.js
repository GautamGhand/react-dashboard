import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { AuthContext } from "../context/context";

function UserEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { base_url } = useContext(AuthContext);
  const { uuid } = useParams();
  const token = localStorage.getItem("authToken");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/users/edit/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setValue("name", response.data.user.name);
      setValue("email", response.data.user.email);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
    };

    setLoader(true);

    try {
      const response = await axios.post(
        `${base_url}/api/users/update/${uuid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === true) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors: backendErrors } = error.response.data;
        Object.keys(backendErrors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: backendErrors[key][0],
          });
        });
      } else {
        console.error("Error:", error);
      }
    } finally {
      setLoader(false);
    }
  };

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

export default UserEdit;
