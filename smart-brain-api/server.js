const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const getProfile = require('./controllers/profile');
const updateEntryCount = require('./controllers/updateRank');

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

app.get('/', (req, res) => res.json(database.users));
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);
app.get('/profile/:id', (req, res) =>
  getProfile.handleGetProfile(req, res, db)
);
app.put('/image', (req, res) =>
  updateEntryCount.handleEntryCount(req, res, db)
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
 / --> res = this is working
 /signin --> POST = success/fail
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> PUT --> user
 
*/
