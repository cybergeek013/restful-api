const express = require("express");
const userRouter = require("./routes/tasks");
const mongoose = require("mongoose");
const Task = require("./models/tasks");

// App
const app = express();
const PORT = 8001;

// Connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/restful-api").then((e) => {
  console.log("MongoDB is Connected !");
});

//middlewares
app.use(express.json());

//Routes
app.use("/tasks", userRouter);

// Server listening on PORT
app.listen(PORT, () => {
  console.log(`Server Started on port: ${PORT}`);
});
