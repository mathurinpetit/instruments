import React,{ useState, useEffect, useRef }  from 'react';
import Layout from "../components/Layout";
import Menu from "./Menu";
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup } from 'react-leaflet';
import axios from 'axios';
import InstrumentsType from "./InstrumentsType";


const centerMap = [48.902170, 2.400660] //Oscillo studio

function CarteGlobale() {

  const [map, setMap] = useState(null);
  const [instrumentsReady,setInstrumentsReady] = useState(null);
  const [instrumentsMarkerList, setInstrumentsMarkerList] = useState([])
  const [filteredInstrumentsList,setFilteredInstrumentsList] = useState([])
  const featureGroupRef = useRef();


const changeType = (newType) => {
  if(!newType){
    setFilteredInstrumentsList(instrumentsMarkerList);
  }else{
    const newFiltered = [];
    instrumentsMarkerList.forEach(instru => {
        if(instru.type === newType){
          newFiltered.push(instru);
        }
      }
    );
    setFilteredInstrumentsList(newFiltered);
  }
}

  useEffect(() => {
    fetchInstrumentMarkerList();
    if (!map) return;
    if (!instrumentsReady) return;
      map.fitBounds(featureGroupRef.current.getBounds());
  }, [map,instrumentsReady]);

  const fetchInstrumentMarkerList = () => {
    axios.get('/emprunt/instrument')
    .then(function (response) {
      setInstrumentsMarkerList(response.data);
      setFilteredInstrumentsList(response.data);
      setInstrumentsReady(true);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
        <Layout>
          <Menu active="carte" />
          <div className="row">
                <div className="col text-right">
                    <label htmlFor="type">Filtrer par instruments : </label>
                </div>
                <div className="col">
                      <select
                        onChange={(event)=>{changeType(event.target.value)}}
                        className="form-control"
                        id="type"
                        >
                        {
                          InstrumentsType.InstrumentsType.map((type, key)=>{
                                    return (
                                    <option key={key} value={type.value}>{type.label}</option>
                                    );
                              })
                        }
                      </select>
                </div>
            </div>
          <br/>

          <div className="card">
            <div className="card-body">
            <MapContainer
              center={centerMap}
              zoom={12}
              style={{ height: "60vh" }}
              whenCreated={setMap}
              >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FeatureGroup ref={featureGroupRef}>
                {filteredInstrumentsList.map((instrument, key)=>{
                const localPosition = (instrument.emprunte && instrument.emprunteurAdresse)? [instrument.emprunteurLat,instrument.emprunteurLon] : centerMap;
                 return (
                     <Marker key={key} position={localPosition} className={"markerInstru "+instrument.type} >
                       <Popup>
                         {instrument.type} <br /> {instrument.name}
                       </Popup>
                     </Marker>
                  );
                })
                }
              </FeatureGroup>
            </MapContainer>
            </div>
          </div>
        </Layout>
  )
}

export default CarteGlobale;
