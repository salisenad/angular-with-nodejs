var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var app = express()
var bcrypt = require('bcrypt-nodejs')


var User = require('./models/User.js')


mongoose.Promise = Promise
var posts = [
    {message: 'Hello'},
    {message: 'hi'}
]
app.use(cors())
app.use(bodyParser.json())
app.get('/posts', (req,res) => {
    res.send(posts)
})
app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v')
        res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
   
})
app.get('/profile/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(200)
    }
   
})
app.post('/register', (req, res) => {
    var userData = req.body;
    var user = new User(userData)
    user.save((err, result) => {
        if(err)
        console.log('saving user error')
        res.sendStatus(200)
    })
})
app.post('/login', async (req, res) => {
    var loginData = req.body;
    var user = await User.findOne({email: userData.email})

    if(!user)
    return res.status(401).send({message: 'Email or password invalid'})

    bcrypt.compare(loginData.pwd, user.pwd, (err, res) => {
        if(!res)
        return res.sendStatus(401).send({message: 'Email or password invalid'})

    })

    if(loginData.pwd != user.pwd) 
    
    var payload = {} 
    var token = jwt.encode(payload, '123')

    console.log(token)
    res.status(200).send({token})
})
mongoose.connect('mongodb://test:test@ds133311.mlab.com:33311/pssocial',(err) => {
    if(!err)
    console.log('connected to mongo')
})

app.listen(3000)