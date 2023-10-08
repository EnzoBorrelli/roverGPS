import "./App.css";
import { useState, useEffect, useRef } from "react";
import { LngLatLike, Map, Marker } from "mapbox-gl";
import { onValue, ref } from "firebase/database";
import { database } from "../init-firebase";

function App() {
  const divMapaRef = useRef<HTMLDivElement>(null);
  const [mapa, setMapa] = useState<Map>();
  const [center, setCenter] = useState<LngLatLike>([-58.0001, -34]);
  const marker = new Marker();
  const [vLat, setVLat] = useState(0);
  const [vLong, setVLong] = useState(0);

  var gpsLat: number;
  var gpsLong: number;

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      gpsLat = data?.GPSAccuracyLogger?.gpsLAT;
      gpsLong = data?.GPSAccuracyLogger?.gpsLONG;
      setCenter([gpsLong, gpsLat]);
      setVLat(gpsLat);
      setVLong(gpsLong);
    });
  }, []);

  useEffect(() => {
    mapa?.flyTo({ center });
    if (mapa) {
      marker.remove();
      marker.setLngLat(center).addTo(mapa);
    }
  }, [center]);

  useEffect(() => {
    if (divMapaRef.current) {
      setMapa(
        new Map({
          container: divMapaRef.current, // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center, // starting position [lng, lat]
          zoom: 1, // starting zoom
        })
      );
    }
  }, [divMapaRef]);

  function CenterMap() {
    mapa?.flyTo({ center });
    console.log(center);
  }

  return (
    <body>
      <div className="overlay">
        <div className="btnsContainer">
          <button className="Btn" onClick={CenterMap}>
            Centrar Mapa
          </button>
        </div>
        <div className="coordsDiv">
          <h2 className="coordsH2">LAT: {vLat}</h2>
          <h2 className="coordsH2">LONG: {vLong}</h2>
        </div>
      </div>
      <div className="mapDiv" ref={divMapaRef}></div>
    </body>
  );
}

export default App;
