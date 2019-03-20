const dotEnv = require('dotenv');

'use strict';

dotEnv.config();

let env = process.env.NODE_ENV;

if(!env){
    env = "development";
}

console.log(`Node environment: ${env}`);
console.log(`loading config.${env}.json`);

module.exports = require(`../config/config.${env}.json`);