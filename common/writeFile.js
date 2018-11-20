'use strict'
const fs = require('fs');
const path = require('path');

module.exports = function(dataObj, fileName) {
    if(!dataObj || !fileName) {
        console.log('请核实数据和文件名');
        return;
    }
    fs.writeFile(path.resolve(__dirname, `../data/${fileName}.json`), JSON.stringify( {data: dataObj} ), 'utf8', ( err ) => {
        if ( err ) {
          console.log( err );
          return;
        }
        console.log( 'write file ok!' );
    } );
}