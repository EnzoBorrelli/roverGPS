import React from "react";
import "./App.css";
import Mapa from "./components/map/Mapa";
import Cabecera from "./components/Cabecera/Cabecera";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
     <BrowserRouter>
          <Cabecera />
          <Routes>
            <Route path="/" element={<Mapa />} />
            <Route path="/Mapa" element={<Mapa />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
