const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Instancio servidor de express
const server = express();

//Importo libreria para crear IDs unicos.
const { v4 : uuidv4 } = require('uuid')


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

const {deliveries, bots} = require('./firestore.js')

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.get('/' , async (req, res) => {
    const snapshot = await deliveries.get();
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

server.get('/deliveries:id' , async (req, res) => {
    let { id } = req.query
    console.log(id)
    const deliveryRef = await deliveries.where('id', '==', id).get()
    console.log(deliveryRef)
    if (!deliveryRef) {
        res.send('No such document!');
      } else {
        res.json(deliveryRef)
            }    
         })

 server.get('/bots' , async (req, res) => {
    const snapshot = await bots.get();
    let botsArray = [];
    snapshot.forEach(doc => {
        botsArray.push(doc)
      });
        if (!botsArray) {
        res.send('No such document!');
          } else {
        res.json(botsArray)
            }    
         })        


server.post('/deliveries' , async (req, res) => {
     let { pickup_lat,pickup_lon,  dropoff_lat , dropoff_lon, zone_id} = req.body;
     const delivery = {
         id : uuidv4(),
         creation_date : new Date (),
         state : 'Pending',
         pickup : {
             pickup_lat : pickup_lat ,
             pickup_lon: pickup_lon
            },
         dropoff: {
             dropoff_lat : dropoff_lat,
             dropoff_lon : dropoff_lon
            },
         zone_id : zone_id, 
     }
    try {
     let created = await deliveries.add(delivery)
     console.log('Added document with ID: ' , created.id)
     res.send(created);
    } catch (err) {
        res.status(404).send(err);
    }
})

server.post('/bots' , async (req, res) => {
    let { location_lat , location_lon , zone_id } = req.body;
    const bot = {
        id: uuidv4(),
        status : "Available",
        location : {
            dropoff_lat: location_lat,
		    dropoff_lon: location_lon
        },
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

server.put('/deliveries' , async (req,res) => {
    let { id , state } = req.body;
    const deliveryRef = await deliveries.where('id', '==', id).get()
    const update = await deliveryRef.update({ state : state });
    console.log(update)
    res.send(update)
})



server.listen(3001, () => {
    console.log('%s listening at 3001')
})