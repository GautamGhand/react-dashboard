import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { AuthContext } from "../context/context";
import { login } from "../api/api";
import { Box, Button, TextField, Typography } from "@mui/material";

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
            Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            {...register("password", {
              required: "Password is required",
            })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loader}
          >
            {loader ? "Logging In..." : "Login"}
          </Button>
        </form>
        {invalidUser && (
          <Typography
            variant="span"
            align="center"
            gutterBottom
            sx={{ color: "red" }}
          >
            Invalid Credentials
          </Typography>
        )}
        {loader && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        )}
      </Box>
    </Box>
  );
}

export default Login;
