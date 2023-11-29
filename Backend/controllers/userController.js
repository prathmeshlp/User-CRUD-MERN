const userModel = require("../Models/userModel");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
};

module.exports.editUser = (req, res) => {
  const _id = req.params.id;
  const user = req.body;
  console.log(_id);
  console.log(user);
  userModel
    .findByIdAndUpdate(_id, { ...user })
    .then(() => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
module.exports.addUser = async (req, res) => {
  const newuser = req.body;
  console.log(newuser)
  try {
    // const { firstname, lastname, email, gender, address, city } = req.body;
    const newUser = new userModel({ ...newuser });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const users = await userModel.findByIdAndDelete(id);
    res.status(201).json(`User ${id} is deleted successfully`);
  } catch (error) {
    res.status(500).json({ error: "Requested User Not Found" });
  }
};
