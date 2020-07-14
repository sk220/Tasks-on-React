import express from 'express';
import mongoose from 'mongoose';
import Task from './models/task.js';


mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))



// получение списка тасков
app.get('/api/tasks', (req, res) => {
  
  setTimeout(
    async () => {
      // if (Math.random() > 0.5) {
      //   return res.status(500).end();
      // }
      res.json( await Task.find())
    },
    1500
  );

});

// получение информации по таску
app.get('/api/task/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    // const result = await task.save();
    res.json(task);
  }
  catch(err) {
    console.log(err, err.message);
    res.json(err);
  }
})


// добавление нового таска
app.post('/api/task', async (req,res) => {

  const title = req.body.title;
  try {
    const task = new Task({title: `${title}`, status: false});
    const result = await task.save();
    console.log(task);
    res.json(result);
  }
  catch(err) {
    console.log(err, err.message);
    res.json(err);
  }
})

//обновление названия таска
app.patch('/api/task/edit/:id', async (req,res) => {
  const id = req.params.id;
  const {newTitle, newStatus} = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, {title: newTitle, status: newStatus}, {omitUndefined: true});
    // const result = await task.save();
    res.json(task);
  }
  catch(err) {
    console.log(err, err.message);
    res.json(err);
  }
});

//обновление статуса таска на завершенный
// app.patch('/api/task/edit/:id', async (req,res) => {
//   const id = req.params.id;
//   const {newStatus} = req.body;

//   try {
//     const task = await Task.findByIdAndUpdate(id, {status: newStatus}, {omitUndefined: true});
//     // const result = await task.save();
//     console.log(task)
//     res.json(task);
//   }
//   catch(err) {
//     console.log(err, err.message);
//     res.json(err);
//   }
// });


//удаление таска
app.delete('/api/task/delete/:id', async (req,res) => {
  debugger;
  const id = req.params.id;
  console.log(req.params);
  try {
    const task = await Task.findByIdAndRemove(id);
    // const result = await task.save();
    res.json(task);}
  catch(err) {
    console.log(err, err.message);
    res.json(err);
  }
});

app.listen(process.env.PORT ?? 3001);
