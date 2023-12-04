import React from "react";

import { Link, useNavigate } from "react-router-dom";

//MUI Imports
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { showUser } from "../features/userDetailSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdduser = () => {
    navigate("/create");
  };

  const handleHome=()=>{
    navigate("/")
  }

  return (
    <div className="navbar">
      <div className="left-side">
        <HomeIcon onClick={handleHome} sx={{ marginLeft: 3, color: "white",cursor:"pointer" }} />
      </div>
      <h2 style={{ color: "white", marginLeft: 50 }}>User CRUD</h2>
      <div className="right-side">
        <Button
          onClick={handleAdduser}
          variant="contained"
          sx={{ color: "white" }}
        >
          Add User
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
