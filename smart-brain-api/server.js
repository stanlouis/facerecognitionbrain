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
  res.json(database.users);
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

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) res.status(400).json('No found');
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) res.status(404).json('not found');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
 / --> res = this is working
 /signin --> POST = success/fail
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> PUT --> user
 
*/
