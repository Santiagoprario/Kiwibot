import React from 'react'
import styles from './Styles/Bots.module.css'

function Bots({ id , state , pickup, zone_id}) {
    // let center_lat = (latPick + latDrop) /2
    // let center_lon = (lonPick + lonDrop) /2

     let pickup_lat = pickup?.mapValue.fields.dropoff_lat.stringValue;
     let pickup_lon = pickup?.mapValue.fields.dropoff_lon.stringValue;

    
    return (
        <div className={styles.bots}>
            {id ? <p>{id}</p> : <p>Orden</p>}
            {state ? <p>Estado : {state}</p> : <p>Estado operacion</p>}
            {zone_id ? <p>Zona : {zone_id}</p>: 'No hay zona'}
            <p>Lat :{pickup_lat} Long: {pickup_lon}</p>
          </div>
    )
}

export default Bots;