import React,{ useState, useEffect}  from 'react';
import Layout from "../components/Layout";
import Menu from "./Menu";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';

const centerMap = [48.902170, 2.400660] //Oscillo studio

function CarteGlobale() {


  const [instrumentsMarkerList, setInstrumentsMarkerList] = useState([])

  useEffect(() => {
      fetchInstrumentMarkerList();
  }, [])

  const fetchInstrumentMarkerList = () => {
      axios.get('/emprunt/instrument')
      .then(function (response) {
        setInstrumentsMarkerList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
        <Layout>
          <Menu active="carte" />
          <h2 className="text-center mt-5 mb-3">Carte</h2>
          <div className="card">
            <div className="card-body">
            <MapContainer center={centerMap} zoom={12} style={{ height: "60vh" }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {instrumentsMarkerList.map((instrument, key)=>{
              const localPosition = (instrument.emprunte && instrument.emprunteurAdresse)? [instrument.emprunteurLat,instrument.emprunteurLon] : centerMap;
              console.log(localPosition);
               return (
                   <Marker key={key} position={localPosition}>
                     <Popup>
                       {instrument.type} <br /> {instrument.name}
                     </Popup>
                   </Marker>
                );
              })
              }
            </MapContainer>
            </div>
          </div>
        </Layout>
  )
}

export default CarteGlobale;
