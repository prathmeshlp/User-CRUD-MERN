const mongoose = require("mongoose");
const express = require("express");
const UserRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const cors = require("cors");

//Middlewares
// app.use(cors());
app.use(express.json());
app.use(cors())

// Routes
app.use("/api",UserRoutes);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
