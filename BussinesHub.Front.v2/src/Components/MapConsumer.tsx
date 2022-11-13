import L from "leaflet";
import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Input } from "../basicComponents/Input/Input";
import { login } from "../store/user/actions";

interface Position {
  x: number;
  y: number;
}

export const MapConsumer: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 45.8, y: 15.9 });
  // const markerOptions = {
  //   title: "markerIndex",
  //   clickable: true,
  //   draggable: false,
  //   icon: L.icon({
  //     iconUrl: "../path",
  //     iconSize: [50, 32],
  //     iconAnchor: [25, 16],
  //     popupAnchor: [-3, -76],
  //   }),
  // };
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setPosition({ x: lat, y: lng });
    },
  });
  return (
    <>
      <Marker position={[position.x, position.y]}>
        <Popup>Click on map to set your location</Popup>
      </Marker>
    </>
  );
};

export default MapConsumer;
