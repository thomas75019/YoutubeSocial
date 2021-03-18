require('dotenv').config();

exports.indexUser = (user, esClient) => {
    let userObject = {
        name: user.name,
        link: process.env.HOST + '/api/user/' + user.id
    };

    esClient.index({
        index: 'users',
        body: userObject
    });

};