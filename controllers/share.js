const Share = require('../models/share');

exports.getAllShares = (req, res, next) => {
    Share.findBy({
        user_id : req.params.user_id
    })
        .then(shares => res.status(200).json({shares}))
        .catch(error => res.status(404).json({error}))
};

exports.getOneShare = (req, res, next) => {
    Share.findBy({
        _id : req.params.id
    })
        .then(share => res.status(200).json({share}))
        .catch(error => res.status(200).json({error}))
};

exports.createShare = (req, res, next) => {
    const share = new Share({
        ...req.body
    });
    share.save()
        .then(() => res.status(201).json({message: 'Created'}))
        .catch(error => res.status(401).json({error}))
};

exports.deleteShare = (req, res, next) => {
    Share.deleteOne({
        _id : req.params.id
    })
        .then(() => res.status(204).json({message: 'Share deleted' }))
        .catch(error => res.status(401).json({error}))
};

exports.updateShare = (req, res, next) => {
    const share = new Share({
        _id : req.body.id,
        url : req.body.url,
        message : req.body.message,
        user_id : req.body.user_id,
        date : req.body.date
    });
    Share.updateOne({
        _id : req.params.id,
    }, share).then(
        () => {
            res.status(201).json({message: 'Share updated'})
        }
    ).catch(
        error => {
            res.status(401).json({error})
        }
    )
};