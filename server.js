const express = require ('express');
const cors = require ('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'cipspostgresqlpw',
    database : 'smartbrain'
  }
});

console.log(knex.select('*').from('users'));


const app = express ();
app.use(express.json());
app.use(cors());  

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@email.com',
      password: 'passwordsss',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res)=>{
  res.send(database.users);
})

app.post('/signin', (req, res)=>{
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      res.json(database.users[0]);
    } else {
      res.status(400).json('incorrect login');
    }
})

app.post('/register', (req, res)=>{
  const {email, name, password} = req.body;
  knex('users')
    .returning('*')
    .insert({
      email:email,
      name:name,
      joined: new Date()
    })
    .then(user=> {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json(`sorry you can't register, try again   `))
});

app.get('/profile/:id', (req, res)=>{
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
    if (!found) {
      res.json('user not found')
    }
  }
  )
})

app.post('/image', (req, res)=>{
  const {id} = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    }})
    if (!found) {
      res.json('user not found')
    }
})

app.listen(3000, ()=>{
  console.log('app is running on port 3000!')
})