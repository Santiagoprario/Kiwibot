import React from 'react'
import styles from './Styles/delivery.module.css'

function Delivery({ id , date , state ,pickup,  dropoff}) {
    
    
    // let year = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
    // let mounth = date.charAt(5) + date.charAt(6);
    // let day = date.charAt(8) + date.charAt(8);
    

    let showDate = date * 1000;

    const dateObject = new Date(showDate)

    let pickup_lat = pickup?.mapValue.fields.pickup_lat.stringValue;
    let pickup_lon = pickup?.mapValue.fields.pickup_lon.stringValue;

    let dropoff_lat = dropoff?.mapValue.fields.dropoff_lat.stringValue;
    let dropoff_lon = dropoff?.mapValue.fields.dropoff_lon.stringValue;
    
    return (
        <table className={styles.table}>
          <ul className={styles.list}>
            {date ? <li className={styles.date}>{dateObject.toLocaleString()}</li> : <li>Fecha creacion</li>}
            {id ? <li>{id}</li> : <li>Orden</li>}
            {state ? <li>{state}</li> : <li>Estado operacion</li>}
            {pickup ? <li>Latitud : {pickup_lat} Longitud: {pickup_lon}</li> : <li>Recogida</li>}
            {dropoff ? <li>Latitud : {dropoff_lat} Longitud: {dropoff_lon}</li> : <li>Entregar</li>}
          </ul>
        </table>
    )
}

export default Delivery;