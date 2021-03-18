const elasticSearch = require('elasticsearch')

exports.client = new elasticSearch.Client({
    host: 'localhost:9200'
})


