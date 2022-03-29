import React,{ useState, useEffect, useRef }  from 'react';
import Layout from "../components/Layout";
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup } from 'react-leaflet';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap';
import L from 'leaflet';
import Double from "../images/icons/Double.png";
import Coupe from "../images/icons/Coupe.png";


const centerMap = [48.902170, 2.400660] //Oscillo studio

function UtilisateurLocalMapModal(props) {

  const instrument = props.instrument;
  const [show, setShow] = useState(false);
  const [map, setMap] = useState(null);
  const [instrumentsMarkerList, setInstrumentsMarkerList] = useState([])
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

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(true);
  }




  useEffect(() => {
    if (!map) return;
      map.fitBounds(featureGroupRef.current.getBounds());
  }, [map]);

  return (
      <div className="p-2" onClick={ (e) => { e.stopPropagation(); e.preventDefault(); }}>
        <button className="btn btn-sm btn-light" onClick={ (e) => { handleShow(e) }} >
          <ion-icon name="map-outline"></ion-icon>
        </button>
        <Modal show={show} onHide={handleClose} size="lg" >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>{props.instrument.name} - {props.instrument.type} - Chez <strong>{props.instrument.emprunteurNom}</strong></h3>
              <h5>
                {props.instrument.emprunteurAdresse}
              </h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              <Marker position={[props.instrument.emprunteurLat,props.instrument.emprunteurLon]} className={"markerInstru "+props.instrument.type}
                icon={ iconsArray[instrument.type+"Icon"] } >
                    <Popup className="mapMiniPopup" maxWidth="350" >
                     <h3>{props.instrument.name} - {props.instrument.type}</h3>
                     <small>{props.instrument.description}</small><br />
                     <h4><strong>{props.instrument.emprunteurNom}</strong></h4>
                     <h6><strong>{props.instrument.emprunteurAdresse}</strong></h6>
                     <button className="btn btn-sm btn-light" onClick={ (e) => { window.location.href="geo:"+props.instrument.emprunteurLat+","+props.instrument.emprunteurLon+"?q="+props.instrument.emprunteurLat+","+props.instrument.emprunteurLon } }  >
                         J'y vais&nbsp;&nbsp;&nbsp;&nbsp;<ion-icon name="navigate-outline"></ion-icon>
                     </button>
                 </Popup>
               </Marker>
            </FeatureGroup>
          </MapContainer>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button className="btn btn-primary" onClick={ (e) => { window.location.href="geo:"+props.instrument.emprunteurLat+","+props.instrument.emprunteurLon+"?q="+props.instrument.emprunteurLat+","+props.instrument.emprunteurLon } } >
                J'y vais&nbsp;&nbsp;&nbsp;&nbsp;<ion-icon name="navigate-outline"></ion-icon>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  )
}

export default UtilisateurLocalMapModal;
