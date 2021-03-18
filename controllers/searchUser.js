const client = require('../services/elasticClient')

exports.SearchUser = (req, res, next) => {
    client.search({
        index: 'users',
        body: {
            size: 10,
            from: 0,
            query: {
                match: {
                    name: req.body.user_name
                }
            }
        }
    }).then(data => {
        res.status(201).json({data: data.hits.hits});
    }).catch(error => {
        res.status(400).json({error})
    })
}