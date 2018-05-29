'use strict'
const fs = require('fs');
module.exports = function(fileName) {
    return new Promise(function (resolve) {
        fs.readFile(`./${fileName}.json`, ( err, data ) => {
            if ( err )
                throw err;
            const urls = JSON
                .parse(data.toString( ))
                .data;
            resolve(urls)
        });
    })
}