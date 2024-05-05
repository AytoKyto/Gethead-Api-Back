import mongoose from "mongoose";

const DataModelSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
  },
  route_id: {
    type: String,
    required: true,
  },
  value: {
    type: Array,
    required: true,
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

const DataModel = mongoose.model("DataModel", DataModelSchema);

export default DataModel;
