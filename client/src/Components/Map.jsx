import React, { useState } from "react";
import GoogleMaps from "simple-react-google-maps"

export default function Maps( {pickup_lat, pickup_lon, dropoff_lat , dropoff_lon}) {
  
   const MY_API_KEY = 'AIzaSyB-Mpjc0yOnqBAPW-MA2rcReDAE6WdM340';

   const latPick = parseFloat(pickup_lat);
   const lonPick = parseFloat(pickup_lon);

   const latDrop = parseFloat(dropoff_lat);
   const lonDrop = parseFloat(dropoff_lon);

    const center_lat = (latPick + latDrop) /2
    const  center_lon = (lonPick + lonDrop) /2

  return (
    <div>
      <GoogleMaps 
      apiKey= {MY_API_KEY}
      style= {{ height: '300px', width: '500px'}}
      zoom={14}
      center={{
          lat: center_lat,
          lng: center_lon

      }}
      markers={[{lat: latPick, lng: lonPick},
                {lat: latDrop, lng: lonDrop},
      ]}
      />
    </div>
  );
}