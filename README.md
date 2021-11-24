# Kiwibot
Kiwibot Challenge

<h4>First Steps</h4>

1) Clone this repository
2) use 'npm install' to install Api and Client.
3) Run the server with 'node index.js'.
4) Run the client server with 'npm start'.


<h4>Endpoints</h4>

POST =>  localhost:3001/deliveries     -> Create new orders to deliver
POST =>  localhost:3001/bots           -> Create new bots to delivery
GET  =>  localhost:3001/               -> Get all of order deliveries
GET  =>  localhost:3001/deliveries:id  -> Get deliver by ID (don't work)
PUT  =>  localhost:3001/deliveries:id  -> You can update any order with the id
