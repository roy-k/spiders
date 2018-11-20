'use strict'
const fs = require('fs');
module.exports = function(path) {
    return new Promise(function (resolve) {
        fs.readFile(path, ( err, data ) => {
            if ( err )
                throw err;
            const urls = JSON
                .parse(data.toString( ))
                .data;
            resolve(urls)
        });
    })
}