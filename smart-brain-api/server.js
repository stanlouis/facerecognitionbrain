const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// for json parsing
app.use(express.json());

const database = {
  users: [
    {
      id: '123',
      name: 'Stan',
      email: 'stan@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Carole',
      email: 'cnl@gmail.com',
      password: 'candies',
      entries: 0,
      joined: new Date()
    }
  ]
};
app.get('/', (req, res) => {
  res.send('App is working');
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
 / --> res = this is working
 /signin --> POST = success/fail
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> PUT --> user
 
*/
