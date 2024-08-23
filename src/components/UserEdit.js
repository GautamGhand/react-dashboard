import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { AuthContext } from "../context/context";
import { Box, Button, TextField, Typography } from "@mui/material";

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

  return (
    <>
      <Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-4 w-[500px] border border-gray-300 flex-col rounded-md p-6 shadow-md"
        >
          <Box>
            <Typography variant="h5" align="center" gutterBottom>
              Edit User
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              {...register("name", { required: "Name is required" })}
              label="Name"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
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

export default UserEdit;
