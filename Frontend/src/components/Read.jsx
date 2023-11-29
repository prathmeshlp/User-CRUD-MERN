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
import { TablePagination, TextField } from "@mui/material";

//rssuite Loader
import { ColorRing } from "react-loader-spinner";

const Read = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [id, setId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [radioData, setRadioData] = useState("");

  // const [showPopup, setShowPopup] = useState(false);

  //Pagination Code
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { users, loading, searchData } = useSelector((state) => state.app);
  console.log(users, "users");

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
    const filteredUsers = users.filter((user) =>
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredUsers);
    setFilteredUsers(filteredUsers);
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
            {/* {showPopup && (
              <CustomModal
                id={id}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
              />
            )} */}
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
                            {/* <Button
                          variant="outlined"
                          color="success"
                          onClick={() => handleEditUser(user)}
                          style={{ marginRight: "12px" }}
                        >
                          Edit User
                        </Button> */}

                            <Link
                              to={`/edit/${user._id}`}
                              className="card-link"
                            >
                              Edit User
                            </Link>
                            {/* <Button
                          variant="outlined"
                          color="error"
                          onClick={() => dispatch(deleteUser(user._id))}
                        >
                          Delete User
                        </Button> */}
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

              {/* <div key={ele._id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{`${ele.firstname} ${ele.lastname}`}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.gender}</p>
                  <button
                    className="card-link"
                    onClick={() => [setId(ele._id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link to={`/edit/${ele._id}`} className="card-link">
                    Edit User
                  </Link>
                  <Link
                    onClick={() => dispatch(deleteUser(ele._id))}
                    className="card-link"
                  >
                    Delete
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Read;
