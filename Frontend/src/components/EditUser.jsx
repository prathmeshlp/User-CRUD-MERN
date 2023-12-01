import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showUser, updateUser } from "../features/userDetailSlice";

const EditUser = () => {
  const { id } = useParams();
  console.log(id, "ID");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    gender: "", // Assuming a default value for gender
  });

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
   
      const singleUser = users.filter((ele) => ele._id === id);
      setUpdateData(...singleUser);
    
  }, []);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log("updated data", updateData);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/");
    dispatch(showUser());
  };

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">FirstName</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            value={updateData && updateData.firstname}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">LastName</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            value={updateData && updateData.lastname}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updateData && updateData.email}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={updateData && updateData.address}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={updateData && updateData.city}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData && updateData.gender === "Male"}
            onChange={newData}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={updateData && updateData.gender === "Female"}
            onChange={newData}
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

export default memo(EditUser);
