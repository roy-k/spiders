'use strict'
const fs = require('fs');
module.exports = function(dataObj, fileName) {
    if(!dataObj || !fileName) {
        console.log('请核实数据和文件名');
        return;
    }
    fs.writeFile( `./${fileName}.json`, JSON.stringify( {data: dataObj} ), 'utf8', ( err ) => {
        if ( err ) {
          console.log( err );
          return;
        }
        console.log( 'write file ok!' );
    } );
}