import React from 'react'
import { useState } from 'react';
import styles from './Styles/Details.module.css'
import Maps from './Map';
import axios from 'axios';
import Bots from './Bots';

function Details({ id , date , state ,pickup,  dropoff}) {
    const [bots, setBots] = useState()

    const [send , setSend] = useState({

    })

    const [selectedBot , setSelectedBot] = useState()

    let showDate = date * 1000;

    const dateObject = new Date(showDate)

    let pickup_lat = pickup?.mapValue.fields.pickup_lat.stringValue;
    let pickup_lon = pickup?.mapValue.fields.pickup_lon.stringValue;

    let dropoff_lat = dropoff?.mapValue.fields.dropoff_lat.stringValue;
    let dropoff_lon = dropoff?.mapValue.fields.dropoff_lon.stringValue;

   const putState = () => {
      if(state === 'Pending') {
        let sendOrder = {
              id,
              state:'Assigned',
         }
         axios.put('http://localhost:3001/deliveries' , sendOrder)
             .then(response => console.log(response.data))
       } 
   }

   const showBots = () => {
     if(!bots) { 
    axios.get('http://localhost:3001/bots')
     .then(response => {
      let available = response.data.map(b => b._fieldsProto)
      let filter = available.filter(b => b.status.stringValue === "Available")
      console.log(filter)
      setBots(filter)
      return bots
    })
    } else {
      setBots()
    }
  }

  const searchBots = (id) => {
    setSelectedBot(id)
    console.log(id)
    return 
}



    return (
       <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.date}>Fecha :{dateObject.toLocaleString()}</p> 
            <p>Numero de Orden :{id}</p>
            <p>Estado : {state}</p>
          </div>
          <div className={styles.map}>
            <Maps 
            pickup_lat={pickup_lat}
            pickup_lon={pickup_lon}
            dropoff_lat={dropoff_lat}
            dropoff_lon={dropoff_lon}
            />
            <div>
               <h3>Asignar a:</h3>
              {state === 'Pending' ? <p>{selectedBot}</p>  : 'No se puede asignar bots a esta Orden'}
            </div>
          </div>
          {!selectedBot && state === 'Pending' ?   <p>Por favor seleccion un bot para Asignar</p> : ''}
         
          <div>
            {state === 'Pending' ? <button onClick={showBots}>Ver Bots disponibles</button> : ''}
            { state === 'Pending' ? <button value='Pending' onClick={(e) => putState(e.target.value)} >Asignar Viaje a Bot</button> : ''}
            { state === 'Assigned' ? <button>Cambiar a En transito</button> : ''}
            { state === 'In_transit' ? <button>Cambiar a Delivered</button> : ''}
            
          </div>
          <section onClick={(e) => {
                searchBots(e.target.innerText)
              }} >
               {bots ? bots?.map(d => <Bots
              
                                        key={d?.id.stringValue}
                                        id={d?.id.stringValue}
                                        state={d?.status.stringValue}
                                        pickup={d?.location}
                                        zone_id='1'
                                        
                                    />) : ''}
          </section>
        </div>

    )
}

export default Details;