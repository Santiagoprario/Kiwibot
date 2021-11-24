import React from 'react'
import { useState } from 'react';
import styles from './Styles/Details.module.css'
import Maps from './Map';
import axios from 'axios';

function Details({ id , date , state ,pickup,  dropoff}) {
    const [bots, setBots] = useState()

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
             .then(response => console.log(response))
       }
       
   }

    
    return (
       <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.date}>Fecha :{dateObject.toLocaleString()}</p> 
            <p>Numero de Orden :{id}</p>
            <p>Estado : {state}</p>
          </div>
          <div className={styles.map}>
            <Maps />
          </div>
          <div>
            { state === 'Pending' ? <button value='Pending' onClick={(e) => putState(e.target.value)} >Asignar Viaje a Bot</button> : ''}
            { state === 'Assigned' ? <button>Cambiar a En transito</button> : ''}
            { state === 'In_transit' ? <button>Cambiar a Delivered</button> : ''}
            <button >Crear nuevo KiwiBot</button>
          </div>
          <section>
{bots ? <p>hola</p> : 'nada'}
          </section>
        </div>

    )
}

export default Details;