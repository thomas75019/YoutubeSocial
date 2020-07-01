const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

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
exports.addFollower =  async (req, res, next) => {
    const user =  await User.findOne({
        _id: req.body._id
    });

    user.follower = req.body.user_id;
    user.save()
        .then(() => {
        res.status(201).json({message: "Follower Added"})
    })
        .catch( error => {
            res.status(401).json({message : error.message })
        })
};
exports.addFollowing = async (req, res, next) => {
    const user =  await User.findOne({
        _id: req.body._id
    });

    user.following = req.body.user_id;
    user.save()
        .then(() => {
            res.status(201).json({message: "Following Added"})
        })
        .catch( error => {
            res.status(401).json({message : error.message })
        })
};