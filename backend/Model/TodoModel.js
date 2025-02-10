import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
  },
  isComplited: {
    type: Boolean,
    default: false,
  },
});
const todoModel = mongoose.model("todoModel", todoSchema);
export default todoModel;
