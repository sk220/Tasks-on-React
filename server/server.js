import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/data', (req, res) => {
  setTimeout(
    () => {
      // if (Math.random() > 0.5) {
      //   return res.status(500).end();
      // }
      return res.json([
          {
            id: 1,
            title: 'Learn React',
            status: false,
            editFlg: false,
          },
          {
            id: 2,
            title: 'Drink Coffee',
            status: false,
            editFlg: false,
          },
      ]);
    },
    1500
  );

});

app.listen(process.env.PORT ?? 3001);
