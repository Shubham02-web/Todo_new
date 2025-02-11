import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import todoModel from "./Model/TodoModel.js";
dotenv.config();
const PORT = process.env.PORT;
const MongoConnect = mongoose.connect(process.env.DB_LINK);
MongoConnect.then(() => {
  console.log("mongoDB connected succesfully");
}).catch(() => {
  console.log("error in monogoDB connection");
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", () => {
  console.log("hey i am app");
});
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find({});
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { todo } = req.body;
    const todos = new todoModel({ todo });
    await todos.save();
    res.status(200).json({
      success: true,
      todos,
      message: "todos created ",
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    await todoModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`hey i am running on PORT no ${PORT}`);
});
