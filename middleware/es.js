const client = require('../services/elasticClient')

function checkUserIndices() {
    client.indices.exists({index: 'users'}, (err, res, status) => {
        if (res) {
            console.log('index already exists');

        } else {
            client.indices.create( {index: 'users'}, (err, res, status) => {
                console.log(err, res, status);
            })
        }
    })
}

module.exports = (next) => {
    client.ping({}, { requestTimeout: 20000 }, (err) => {
        if(err) {
            console.log('The cluster is down')
        }
        else {
            checkUserIndices()
                .then(() => next());
        }
    })
}