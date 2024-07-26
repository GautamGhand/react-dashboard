import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import { logout, userListing } from "../api/api";

function UserListing() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 200) {
      if (response.data.success === true) {
        setUser(null);
        localStorage.removeItem("authToken");
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="overflow-x-auto text-center">
        <button onClick={handleLogout} className="bg-red-500 text-white p-2">
          Logout
        </button>
        <Link
          to={"/users/create"}
          className="bg-blue-500 text-white flex justify-end"
        >
          Create User
        </Link>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link to={`/users/edit/${user.uuid}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default UserListing;
