import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const TaskSchema = new mongoose.Schema({
  title: { type: String },
  status: { type: Boolean },
});


const Task = mongoose.model('Task', TaskSchema);

async function seeder() {
  
  const task1 = new Task({
    title: "Learn React",
    status: false,
  });
  await task1.save();

  const task2 = new Task({
    title: "Drink Coffee",
    status: false,
  });
  await task2.save();
}

seeder();
