const mongoose = require("mongoose");
const express = require("express");
const UserRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const cors = require("cors");

//Middlewares
// app.use(cors());
app.use(cors())
app.use(express.json());


// Routes
app.get('/',(req,res)=>{res.status(200).json({message:"Hello World"})})
app.use("/", UserRoutes);

const PORT = 3001 || process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
