const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Instancio servidor de express
const server = express();

server.name = 'API kiwibot Challenge';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


const {deliveries, bots} = require('./firestore.js')



server.get('/' , async (req, res) => {
    const snapshot = await deliveries.get();
    console.log(snapshot)
    let deliveriesArray = [];
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        deliveriesArray.push(doc)
      });
        if (!deliveriesArray) {
        res.send('No such document!');
          } else {
        res.json(deliveriesArray)
            }    
         })


server.post('/deliveries' , async (req, res) => {
     let { date, state, pickup, dropoff, zone_id} = req.body;
     console.log(req.body)
     const delivery = {
         creation_date : date,
         state : state,
         pickup : pickup,
         dropoff: dropoff,
         zone_id : zone_id,
         
     }
     console.log(delivery)
    try {
     let created = await deliveries.add(delivery)
     console.log('Added document with ID: ' , created.id)
     res.send(created);
    } catch (err) {
        res.status(404).send(err);
    }
})

server.post('/bots' , async (req, res) => {
    let { status, location , zone_id} = req.body;
    const bot = {
        status : status,
        location : location,
        zone_id : zone_id, 
    }
    console.log(bot)
   try {
    let created = await bots.add(bot)
    console.log('Added document with ID: ' , created.id)
    return res.send(created);
   } catch (err) {
    return res.status(404).send(err);
   }
})



server.listen(3001, () => {
    console.log('%s listening at 3001')
})