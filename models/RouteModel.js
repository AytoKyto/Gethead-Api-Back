import mongoose from 'mongoose';

const RouteSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  endpoint: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  description: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  number_of_loops: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  date_updated: {
    type: Date,
  },
});

const Route = mongoose.models.Route || mongoose.model('Route', RouteSchema);
export default Route;
