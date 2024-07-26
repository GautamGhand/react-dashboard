import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { AuthContext } from "../context/context";
import { login } from "../api/api";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [invalidUser, setInvalidUser] = useState(false);

  const onSubmit = async (data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };

    setLoader(true);

    try {
      const response = await login(formData);
      if (response.data.success === true) {
        setUser(response.data.user);
        localStorage.setItem("authToken", response.data.token);
        setInvalidUser(false);
        navigate("/dashboard");
      } else {
        setInvalidUser(true);
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
            })}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-800 text-white rounded"
            disabled={loader}
          >
            {loader ? "Logging In..." : "Login"}
          </button>
        </div>
        {invalidUser && (
          <span className="text-red-500">Invalid Credentials</span>
        )}
      </form>
      {/* <div>
        <GoogleOAuthProvider clientId="636709310-656o92no25p5dbpp632hcortmttnv9qc.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            state_cookie_domain={true}
          />
        </GoogleOAuthProvider>
      </div> */}
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

export default Login;
