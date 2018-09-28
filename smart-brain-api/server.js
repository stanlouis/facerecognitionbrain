const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();
const port = process.env.PORT || 3000;

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'stan',
    password: '',
    database: 'smart-brain'
  }
});

db.select('*')
  .from('users')
  .then(data => console.log(data));

// for json parsing
app.use(express.json());
app.use(cors());
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
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('Unable to register'));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select('*')
    .from('users')
    .where({
      id: id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
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
