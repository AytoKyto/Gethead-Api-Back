import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  user_id: {
    type: String,
    required: true,
    min: 6,
    max: 255,
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

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
