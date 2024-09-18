import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { userCreate } from "../api/api";
import { Box, Button, TextField, Typography } from "@mui/material";

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
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirm_password,
      profile_image:data.profile_image
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

  const password = watch("password");

  return (
    <>
      <Box>
        <Typography variant="h5" align="center" gutterBottom>
          Register User
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-4 w-[500px] border border-gray-300 flex-col rounded-md p-6 shadow-md"
        >
          <Box>
            <TextField
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              label="Email"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Box>
          <Box>
            {preview && (
              <div>
                <h4>Image Preview:</h4>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            )}
            <TextField
              InputLabelProps={{ shrink: true }}
              type="file"
              variant="outlined"
              fullWidth
              {...register("profile_image", { required: "Image is required" })}
              label="Image"
              error={!!errors.profile_image}
              helperText={errors.profile_image ? errors.profile_image.message : ""}
              onChange={handleFileChange}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              fullWidth
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              label="Password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              label="Confirm Password"
              error={!!errors.confirm_password}
              helperText={
                errors.confirm_password ? errors.confirm_password.message : ""
              }
            />
          </Box>
          <Box>
            <Button
              type="submit"
              disabled={loader}
              variant="contained"
              color="primary"
            >
              {loader ? "Submitting..." : "Submit"}
            </Button>
          </Box>
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
      </Box>
    </>
  );
}

export default UserCreate;
