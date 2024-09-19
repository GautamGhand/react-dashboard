import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userListing } from "../api/api";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AuthContext } from "../context/context";

function UserListing() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const {base_url} = useContext(AuthContext);

  const fetchData = async (page) => {
    const response = await userListing(page);
    setUsers(response.data.users.data);
    setTotalPages(response.data.users.last_page);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box textAlign="center" overflow="auto">
        <Button
          component={Link}
          to="/users/create"
          variant="contained"
          sx={(theme) => ({
            margin: 1,
            float: "left",
            color: theme.palette.primary,
          })}
        >
          Create User
        </Button>
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.profile_image ? (
                      <img
                        src={`${base_url}/${user.profile_image}`}
                        alt={`${user.name}'s profile`}
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/users/edit/${user.uuid}`}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(index + 1)}
            sx={(theme) => ({
              marginX: 0.5,
              color:
                currentPage === index + 1
                  ? theme.palette.primary
                  : theme.palette.secondary,
            })}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </>
  );
}

export default UserListing;
