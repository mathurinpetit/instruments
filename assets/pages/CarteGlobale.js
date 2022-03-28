import React,{ useState, useEffect, useRef }  from 'react';
import Layout from "../components/Layout";
import Menu from "./Menu";
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup } from 'react-leaflet';
import axios from 'axios';
import InstrumentsType from "./InstrumentsType";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Double from "../images/icons/Double.png";
import Coupe from "../images/icons/Coupe.png";


const centerMap = [48.902170, 2.400660] //Oscillo studio

function CarteGlobale() {

  const [map, setMap] = useState(null);
  const [instrumentsReady,setInstrumentsReady] = useState(null);
  const [instrumentsMarkerList, setInstrumentsMarkerList] = useState([])
  const [filteredInstrumentsList,setFilteredInstrumentsList] = useState([])
  const featureGroupRef = useRef();


  let iconsArray = {
    "DoubleIcon": L.icon({
      iconUrl: Double,
      iconRetinaUrl: Double,
      iconAnchor: [35, 30],
      popupAnchor: [10, -44],
      iconSize: [60, 60],
    }),
    "CoupeIcon": L.icon({
      iconUrl: Coupe,
      iconRetinaUrl: Coupe,
      iconAnchor: [35, 30],
      popupAnchor: [10, -44],
      iconSize: [60, 60],
    })
  }

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(40, 40, true),
    });
  };

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
                <MarkerClusterGroup
                  showCoverageOnHover={false}
                  spiderfyDistanceMultiplier={2}
                  iconCreateFunction={createClusterCustomIcon}
                  >
                {filteredInstrumentsList.filter((instrument) => {
                    if (instrument.emprunte && (!instrument.emprunteurAdresse || !instrument.emprunteurLat || !instrument.emprunteurLon)) {
                      return false;
                    }
                    return true;
                  }).map((instrument, key)=>{
                  const localPosition = (instrument.emprunte && instrument.emprunteurAdresse)? [instrument.emprunteurLat,instrument.emprunteurLon] : centerMap;
                  const adresse = (!instrument.emprunte || !instrument.emprunteurAdresse)? 'Au Studio' : instrument.emprunteurAdresse;
                  const nom = (!instrument.emprunte || !instrument.emprunteurNom)? '' : instrument.emprunteurNom;

                  const instruIcon = instrument.type+"Icon";
                  return (
                     <Marker key={key} position={localPosition} className={"markerInstru "+instrument.type}
                       icon={ iconsArray[instrument.type+"Icon"] } >
                       <Popup className="mapMiniPopup" maxWidth="500" >
                         <h3>{instrument.name} - {instrument.type}</h3>
                         <small>{instrument.description}</small><br />
                         <h4><strong>Chez {nom}</strong></h4>
                         <h4><strong>{adresse}</strong></h4>
                       </Popup>
                     </Marker>
                  );

                  })

                }
                </MarkerClusterGroup>;
              </FeatureGroup>
            </MapContainer>
            </div>
          </div>
        </Layout>
  )
}

export default CarteGlobale;
