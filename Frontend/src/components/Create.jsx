import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, showUser } from "../features/userDetailSlice";

const Create = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    gender: "", // Assuming a default value for gender
  });

  console.log(user, "user");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user...", user);
    dispatch(createUser(user));
    dispatch(showUser())
    navigate("/");
  };

  return (
    <div>
      <h2 className="my-2">Fill The User Data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            onChange={getUserData}
            required
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            onChange={getUserData}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
