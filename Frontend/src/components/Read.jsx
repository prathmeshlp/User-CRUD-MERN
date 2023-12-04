import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, showUser } from "../features/userDetailSlice";
// import CustomModal from "./CustomModal";
//MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";

//Mat Icons
import EditIcon from "@mui/icons-material/Edit";

//rssuite Loader
import { ColorRing } from "react-loader-spinner";

const Read = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [radioData, setRadioData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Pagination Code
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { users, loading, searchData } = useSelector((state) => state.app);
  console.log(users, "Users");

  useEffect(() => {
    dispatch(showUser());
    console.log("useeffect");
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      dispatch(deleteUser(id));
      alert("User Deleted SuccessFully...");
      dispatch(showUser());
      navigate("/");
    } else {
      navigate("/");
    }
  };
  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputSearch = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
    users.filter((user) =>
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  return (
    <>
      {loading ? (
        <ColorRing
          visible={true}
          height="600"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        <>
          <div className="main-container">
            <div className="serach-input-container">
              <input
                name="seacrhinput"
                placeholder="Search user.."
                value={searchQuery}
                onChange={(e) => handleInputSearch(e)}
                style={{ padding: 10, width: 300, borderRadius: 10 }}
              />
            </div>
            <div className="filters" style={{ marginTop: 15 }}>
              <input
                className="form-check-input"
                name="gender"
                checked={radioData === ""}
                type="radio"
                onChange={(e) => setRadioData("")}
              />
              <label className="form-check-label">All</label>
              <input
                className="form-check-input"
                name="gender"
                checked={radioData === "Male"}
                value="Male"
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
              />
              <label className="form-check-label">Male</label>
              <input
                className="form-check-input"
                name="gender"
                value="Female"
                checked={radioData === "Female"}
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
              />
              <label className="form-check-label">Female</label>
            </div>
            <div className="table-container">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "50px" }} align="center">
                        ID
                      </TableCell>
                      <TableCell align="center">Firstname</TableCell>
                      <TableCell align="center">Lastname</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Gender</TableCell>
                      <TableCell align="center">City</TableCell>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? users.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : users && users
                    )
                      .filter((user) => {
                        if (searchData.length === 0) {
                          return user;
                        } else {
                          return user.name
                            .toLowerCase()
                            .includes(searchData.toLowerCase());
                        }
                      })
                      .filter((user) => {
                        if (radioData === "Male") {
                          return user.gender === radioData;
                        } else if (radioData === "Female") {
                          return user.gender === radioData;
                        } else return user;
                      })
                      .filter((user) =>
                        user.firstname
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((user, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{user._id}</TableCell>
                          <TableCell align="center">{user.firstname}</TableCell>
                          <TableCell align="center">{user.lastname}</TableCell>
                          <TableCell align="center">{user.email}</TableCell>
                          <TableCell align="center">{user.gender}</TableCell>
                          <TableCell align="center">{user.city}</TableCell>
                          <TableCell align="center">{user.address}</TableCell>
                          <TableCell align="center">
                            {/* <Link
                              to={`/edit/${user._id}`}
                              className="card-link"
                            >
                              Edit User
                            </Link> */}
                            <Link
                              to={`/edit/${user._id}`}
                              className="card-link"
                            >
                              Edit User
                            </Link>
                            <Link
                              onClick={() => handleDeleteUser(user._id)}
                              className="card-link"
                            >
                              Delete
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Read;
