const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Like = require('./models/like');
const bodyParser = require('body-parser');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.post('/api/like', (req, res, next) => {
    console.log(req.body)
    const like = new Like({
        ...req.body
    });
    like.save()
        .then(() => {
            res.status(201).json({message: "worked"})
        })
        .catch( error => {
            res.status(401).json({message : error})
        })
});
app.get('/api/likes', (req, res, next) => {
    Like.find()
        .then( likes => res.status(200).json({likes}))
        .catch( error => res.status(404).json({error}))
});

module.exports = app;