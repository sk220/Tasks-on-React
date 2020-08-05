import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String },
  status: { type: String },
  description: { type: String },
});

export default mongoose.model('Task', TaskSchema);

