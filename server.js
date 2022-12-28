const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const { Pool } = require("pg");

const connectionString = 
"postgresql://postgres:yBYKSfCJJil9CfRoIkgv@containers-us-west-178.railway.app:7881/railway";

const pool = new Pool({
    connectionString,
});
module.exports = pool;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('it is working')
})

app.post('/signin', (req,res) => { signin.handleSignin(req, res, pool, bcrypt)}),

app.post('/register',(req,res) => { register.handleRegister(req, res, pool, bcrypt)}),

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, pool)}),

app.put('/image', (req,res) => { image.handleImage(req, res, pool)}),

app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})


//bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
//});

// Load hash from your password DB.

//bcrypt.hash(password, null, null, function(err, hash) {
//    console.log(hash);
//});
//bcrypt.compare("bacon", hash, function(err, res) {
    //res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    //res = false
//});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`) ;
})

