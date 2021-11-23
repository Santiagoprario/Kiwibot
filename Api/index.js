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
     let { pickup_lat,pickup_lon,  dropoff_lat , dropoff_lon, zone_id} = req.body;
     
     console.log(req.body)
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

server.put('/deliveries' , async (req,res) => {
    let { state } = req.body;
    let id = 'faec9b6d-335e-4287-91e5-f1c44fa8f2dd'
    const deliveryRef = await deliveries.where('id', '==', id).get()
    console.log(deliveryRef)
    const update = deliveryRef.docs.map(e => {
        return {
            id: e.ref.id,
            state: e.data().state,
        }
    });
    console.log(update)
    res.send(update)
})



server.listen(3001, () => {
    console.log('%s listening at 3001')
})