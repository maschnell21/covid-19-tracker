import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { ShowDataOnMap } from "./utils";
function Map({ countries,casesType,center, zoom }) {
  return (
    <div className="map_box">
      <LeafletMap className="map"  center={center} zoom={zoom}>
        {/* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' /> */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ShowDataOnMap(countries,casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;

