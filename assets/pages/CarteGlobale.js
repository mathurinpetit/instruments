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
import Repik from "../images/icons/Repik.png";
import Caisse from "../images/icons/Caisse.png";
import Marca1 from "../images/icons/Marca1.png";
import Marca2 from "../images/icons/Marca2.png";
import Timbao from "../images/icons/Timbao.png";


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
    }),
    "RepikIcon": L.icon({
      iconUrl: Repik,
      iconRetinaUrl: Repik,
      iconAnchor: [35, 30],
      popupAnchor: [10, -44],
      iconSize: [60, 60],
    }),
    "CaisseIcon": L.icon({
      iconUrl: Caisse,
      iconRetinaUrl: Caisse,
      iconAnchor: [35, 30],
      popupAnchor: [10, -44],
      iconSize: [60, 60],
    }),
    "Marca1Icon": L.icon({
      iconUrl: Marca1,
      iconRetinaUrl: Marca1,
      iconAnchor: [35, 30],
      popupAnchor: [10, -44],
      iconSize: [60, 60],
    }),
    "Marca2Icon": L.icon({
      iconUrl: Marca2,
      iconRetinaUrl: Marca2,
      iconAnchor: [35, 30],
      popupAnchor: [10, -44],
      iconSize: [60, 60],
    }),
    "TimbaoIcon": L.icon({
      iconUrl: Timbao,
      iconRetinaUrl: Timbao,
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
                  const nom = (!instrument.emprunte || !instrument.emprunteurNom)? 'Au Studio' : 'Chez '+instrument.emprunteurNom;
                  const adresse = (!instrument.emprunte || !instrument.emprunteurAdresse)? '' : instrument.emprunteurAdresse;

                  const instruIcon = instrument.type+"Icon";
                  return (
                     <Marker key={key} position={localPosition} className={"markerInstru "+instrument.type}
                       icon={ iconsArray[instrument.type+"Icon"] } >
                       <Popup className="mapMiniPopup" maxWidth="350" >
                         <h3>{instrument.name} - {instrument.type}</h3>
                         <small>{instrument.description}</small><br />
                         <h4><strong>{nom}</strong></h4>
                         <h6><strong>{adresse}</strong></h6>
                         <a className="btn btn-sm btn-light" target="_blank" href={"geo:"+localPosition[0]+","+localPosition[1]+"?q="+localPosition[0]+","+localPosition[1]} >
                             J'y vais&nbsp;&nbsp;&nbsp;&nbsp;<ion-icon name="navigate-outline"></ion-icon>
                         </a>
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
