import React from 'react'
import "./map.scss"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import Pin from '../pin/Pin'

const Map = ({items}) => {
    const position = [51.505, -0.09]

    
  return (
<MapContainer center={[51.505, -0.09]} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map((item) => (
        <Pin item={item} key={item.id} />
    ))}
  </MapContainer>
  )
}
export default Map
