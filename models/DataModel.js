import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
  },
  route_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  valeur: {
    type: String,
    required: true,
  },
  argument: {
    type: String,
    required: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
});

const Data = mongoose.model("Data", DataSchema);

export default Data;
