import "./App.css";
import { useState, useEffect, useRef } from "react";
import { LngLatLike, Map, Marker } from "mapbox-gl";

function App() {
  const divMapaRef = useRef<HTMLDivElement>(null);
  const [mapa, setMapa] = useState<Map>();
  const [center, setCenter] = useState<LngLatLike>([-58.0001, -34]);
  useEffect(() => {
    mapa?.flyTo({ center });
    if (mapa) {
      new Marker().setLngLat(center).addTo(mapa);
    }
  }, [center]);
  useEffect(() => {
    if (divMapaRef.current) {
      setMapa(
        new Map({
          container: divMapaRef.current, // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center, // starting position [lng, lat]
          zoom: 9, // starting zoom
        })
      );
    }
  }, [divMapaRef]);

  function Alol() {
    setCenter([-10, -10]);
  }
  function Blol() {
    setCenter([-20, -20]);
  }
  function Clol() {
    setCenter([-30, -30]);
  }

  return (
    <body>
      <button onClick={Alol}>A</button>
      <button onClick={Blol}>B</button>
      <button onClick={Clol}>C</button>
      <div className="mapDiv" ref={divMapaRef}></div>
    </body>
  );
}

export default App;
