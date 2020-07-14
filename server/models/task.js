import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String },
  status: { type: Boolean },
});

export default mongoose.model('Task', TaskSchema);

