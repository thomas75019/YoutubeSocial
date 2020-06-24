const Like = require('../models/like');

exports.CreateLike = (req, res, next) => {
    const like = new Like({
        ...req.body
    });
    like.save()
        .then(() => {
            res.status(201).json({message: "Created"})
        })
        .catch( error => {
            res.status(401).json({message : error})
        })
};
exports.GetLikes = (req, res, next) => {
    Like.find()
        .then( likes => res.status(200).json({likes}))
        .catch( error => res.status(404).json({error}))
};
exports.GetOneLike = (req, res, next) => {
    Like.findOne({
        _id : req.params.id
    })
        .then( like => res.status(200).json({like}))
        .catch( error => res.status(404).json({error}))
};
exports.DelOneLike = (req, res, next) => {
    Like.deleteOne({
        _id : req.params.id
    })
        .then(() => res.status(200).json({message: 'Like Removed'}))
        .catch( error => res.status(401).json({error}))
};