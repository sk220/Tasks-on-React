import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const TaskSchema = new mongoose.Schema({
  title: { type: String },
  status: { type: String },
});


const Task = mongoose.model('Task', TaskSchema);

async function seeder() {
  
  const task1 = new Task({
    title: "Learn React",
    status: "open",
  });
  await task1.save();

  const task2 = new Task({
    title: "Drink Coffee",
    status: "open",
  });
  await task2.save();
}

seeder();
