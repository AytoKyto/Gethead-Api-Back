import mongoose from "mongoose";

const TestModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const TestModel = mongoose.model("TestModel", TestModelSchema);

export default TestModel;
