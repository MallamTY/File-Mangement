//mongod --dbpath "C:\Program Files\MongoDB\Server\5.0\data" --logpath "C:\Program Files\MongoDB\Server\5.0\bin\mongod.log" --install --serviceName "MongoDB"

'use strict';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/uploaded-file-database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: true,
        //useCreateIndex: true
    })
    .then(() => console.log(`\n \n Conection to the uploaded-file-database estalished ........................`));
    
}