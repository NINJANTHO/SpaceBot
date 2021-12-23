if(Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("La version de Node.js est inférieure à la 12.0.0. Veuillez vous mettre en v12.0.0 ou plus.");

const RainsBot = require('./structure/Boritoz');
const client = new RainsBot();
const moment = require('moment');


client.init();

client.mongoose.connection.on('reconnected', () => {
    console.log('MongoDB s\'est reconnecté')
   
   });
