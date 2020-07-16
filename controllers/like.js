const Like = require('../models/like');
const { v4: uuidv4 } = require('uuid');

exports.CreateLike = (req, res, next) => {
    const like = new Like({
        _id : uuidv4(),
        ...req.body
    });
    like.save()
        .then((like) => {
            res.status(201).json(like,[
                { rel: "self",title :"Get like", method: "GET", href: 'http://localhost:3000/api/like/' + like._id },
                { rel: "delete",title :"delete like", method: "DELETE", href: 'http://localhost:3000/api/like/' + like._id },
        ])
        })
        .catch( error => {
            res.status(400).json(error)
        })
};
exports.GetLikes = (req, res, next) => {
    Like.find()
        .then( likes => {
                let data = [];
                likes.forEach( (like) => {
                    data.push({
                        _id: like._id,
                        date: like.date,
                        user_id: like.user_id,
                        links: [
                            { rel: "self",title :"Get like", method: "GET", href: 'http://localhost:3000/api/like/' + like._id },
                            { rel: "delete",title :"delete like", method: "DELETE", href: 'http://localhost:3000/api/like/' + like._id }
                        ]
                    })
                });
            res.status(200).json(data);

            }
        )
        .catch( error => res.status(404).json({message: error.message}))
};
exports.GetOneLike = (req, res, next) => {
    Like.findOne({
        _id : req.params.id
    })
        .then( like => res.status(200).json({like}, [
            { rel: "delete",title :"delete like", method: "DELETE", href: 'http://localhost:3000/api/like/' + like._id },
        ]))
        .catch( error => res.status(404).json({error}))
};
exports.DelOneLike = (req, res, next) => {
    Like.deleteOne({
        _id : req.params.id
    })
        .then(() => res.status(200).json({message: 'Like Removed'}))
        .catch( error => res.status(401).json({error}))
};