import { useState, useEffect, useRef } from "react";
import { Map, Marker } from "mapbox-gl";
import "./Mapa.css";

function Mapa() {
  const divMapaRef = useRef<HTMLDivElement>(null);
  const [mapa, setMapa] = useState<Map>();
  const [Coords,SetCoords] = useState([-58.45, -34.8])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        SetCoords([coords.longitude,coords.latitude])
      },
      () => {}
    );
  });
  /*useEffect(()=>{
    if(mapa){
      new Marker().setLngLat([coords.latitude,coords.longitude])
    }
  })*/
  useEffect(() => {
    if (divMapaRef.current) {
      setMapa(
        new Map({
          container: divMapaRef.current, // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center: [-58.45, -34.8], // starting position [lng, lat]
          zoom: 9, // starting zoom
        })
      );
    }
  }, [divMapaRef]);

  return (
    <div className="ElMapa">
      <div className="mapDiv" ref={divMapaRef}></div>
    </div>
  );
}

export default Mapa;
