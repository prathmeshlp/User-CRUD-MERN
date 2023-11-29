import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


//MUI Imports
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [searchData, setSearchData] = useState("");

  // useEffect(() => {
  //   dispatch(searchUser(searchData));
  // }, [searchData]);

  //MUI Code
  // const onAdduser=()=>{
  //   navigate('/create')
  // }

  const handleAdduser = () => {
    navigate("/create");
  };

  return (
    <div className="navbar">
    
      <div className="left-side">
        <Link to="/">
          <HomeIcon sx={{ marginLeft: 3, color: "white" }} />
        </Link>
      </div>
      <h2 style={{color:"white",marginLeft:50}}>User CRUD</h2>
      <div className="right-side">
        {/* <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        /> */}
        <Button
          onClick={handleAdduser}
          variant="contained"
          sx={{ color: "white" }}
        >
          Add User
        </Button>
      </div>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <h4 className="navbar-brand">RTK</h4>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  All Post ({allusers.length})
                </Link>
              </li>
            </ul>
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </div>
      </nav> */}
      {/* <div className="appbar"> */}
      {/* <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar> */}
      {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
      {/* <Typography
                className="nav-head"
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }  }}
              >
                User CRUD
              </Typography> */}
      {/* <div className="nav-links"></div> */}
      {/* <span className="nav-head">User CRUD</span> */}
      {/* <Link to="/">
                <HomeIcon sx={{ marginLeft: 3,color:"white" }} />
              </Link> */}
      {/* <div className="search-box">
                <TextField
                  sx={{ background: "white" }}
                  id="outlined-search"
                  label="Search User"
                  type="search"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
              </div> */}
      {/* <Link className="adduser" to="/create"> <Button variant="contained" sx={{color:"white"}}>Add User</Button></Link> */}
      {/* </Toolbar>
          </AppBar>
        </Box> */}
      {/* </div> */}
    </div>
  );
};

export default Navbar;
