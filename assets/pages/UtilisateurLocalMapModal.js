import React,{ useState, useEffect, useRef }  from 'react';
import Layout from "../components/Layout";
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup } from 'react-leaflet';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap';


const centerMap = [48.902170, 2.400660] //Oscillo studio

function UtilisateurLocalMapModal(props) {

  const instrument = props.instrument;
  const [show, setShow] = useState(false);
  const [map, setMap] = useState(null);
  const [instrumentsMarkerList, setInstrumentsMarkerList] = useState([])
  const featureGroupRef = useRef();

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
      <div onClick={ (e) => { e.stopPropagation(); e.preventDefault(); }}>
        <button className="btn btn-sm btn-light" onClick={ (e) => { handleShow(e) }} >
          <ion-icon name="map-outline"></ion-icon>
        </button>
        <Modal show={show} onHide={handleClose} size="lg" >
          <Modal.Header closeButton>
            <Modal.Title>{props.instrument.emprunteurAdresse}</Modal.Title>
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
              <Marker position={[props.instrument.emprunteurLat,props.instrument.emprunteurLon]} className={"markerInstru "+props.instrument.type} >
                 <Popup>
                   {props.instrument.type} <br /> {props.instrument.name}
                 </Popup>
               </Marker>
            </FeatureGroup>
          </MapContainer>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button className="btn btn-primary">
              J'Y VAIS
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  )
}

export default UtilisateurLocalMapModal;
