import React, { useState } from "react";
import GoogleMaps from "simple-react-google-maps"

export default function Maps(  ) {
  
   const MY_API_KEY = 'AIzaSyBgc5talozpn7Ao2TUJW3OPZnXyjE42eBA';


   const pickup_lat = -38.000676;
   const pickup_lon = -57.542457;


  return (
    <div>
      <GoogleMaps 
      apikey= {MY_API_KEY}
      style= {{ height: '200px', width: '300px'}}
      zoom={12}
      center={{
          lat: pickup_lat,
          lng: pickup_lon
      }}
      markers={[{lat: pickup_lat, lng: pickup_lon}]}
      />
    </div>
  );
}