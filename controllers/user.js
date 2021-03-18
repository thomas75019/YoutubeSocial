const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const client = require('../services/elasticClient');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                _id: uuidv4(),
                email: req.body.email,
                name: req.body.name,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(400).json({ message : error.message }));
        })
        .catch(error => res.status(500).json({ error }));
};
exports.addFollower =  (req, res, next) => {
    const follower = {user_id: req.body.user_id};
    User.findOneAndUpdate(
    {
        _id: req.body.id
    },
        { $push: { follower: follower }
    })
        .then( () => {
            res.status(201).json({message: "Follower Added"})
        })
        .catch( error => {
            res.status(401).json({message : error.message })
        })

};
exports.addFollowing = (req, res, next) => {

    const following = {user_id: req.body.user_id};
    User.findOneAndUpdate(
        {
            _id: req.body.id
        },
        { $push: { follower: following }
        })
        .then( () => {
            res.status(201).json({message: "Following Added"})
        })
        .catch( error => {
            res.status(401).json({message : error.message })
        })
};
exports.getUser = (req, res, next) => {
    User.findOne(
        {
            email: req.body.email
        })
        .then( user => {
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                follower: user.follower,
                following: user.following
            });
        })
        .catch( error => {
            res.status(404).json({message: error.message})
        });
};