import React,{ useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from 'sweetalert2';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


function UtilisateurModal(props) {


  const REACT_APP_ADRESSE_API_URL = process.env.REACT_APP_ADRESSE_API_URL;
  const REACT_APP_ADRESSE_API_PARAMS = process.env.REACT_APP_ADRESSE_API_PARAMS;

  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);
  const [utilisateursOptions, setUtilisateursOptions] = useState([])
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false)
  const [isNew, setIsNew] = useState(false);
  const [show, setShow] = useState(false);


  const [checked, setChecked] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedAdresse, setSelectedAdresse] = useState([]);
  const [isAdresseLoading, setIsAdresseLoading] = useState(false);
  const [optionsAdresse, setOptionsAdresse] = useState([]);

  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);

  const typeahead = useRef(null);

  const handleChangeCheckbox = () => {
    setChecked(!checked);
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  }
  const handleShow = () => {
    setShow(true);
    if(props.userAddress){
      setChecked(false);
      setName(props.user)
      moveSelectionOfAdresse(props.userAddress)
    }else{
      setChecked(true);
    }

  }

const moveSelectionOfAdresse = (adresseStr) => {

      axios.get(`${REACT_APP_ADRESSE_API_URL}?${REACT_APP_ADRESSE_API_PARAMS}&q=${adresseStr}&limit=1`, {transformRequest: (data, headers) => {
        delete headers.common['Authorization'];
        return data;
      }
    })
    .then(function (response){
      const items = response.data.features;
      const options = items.map((i) => ({
        id: i.properties.id,
        adresse: i.properties.label,
        coordinates: i.geometry.coordinates
      }));
      setOptionsAdresse(options);
      setSelectedAdresse(options.slice(0,1));
      setAddress(options[0].adresse);
      setLon(options[0].coordinates[0]);
      setLat(options[0].coordinates[1]);
      setIsAdresseLoading(false);
    });
}

  const cookies = new Cookies();

  useEffect(() => {
      if(!props.user){
        handleShow();
      }
      fetchUtilisateursOptions();
  }, [])

  const fetchUtilisateursOptions = () => {
      axios.get('/identification/utilisateurs')
      .then(function (response) {
        setUtilisateursOptions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleNomChange = (
      newValue,
      actionMeta
    ) => {
      // console.group('Value Changed');
      // console.log(newValue);
      // console.log(`action: ${actionMeta.action}`);
      // console.groupEnd();

      if(`${actionMeta.action}` == "create-option"){
        setName(newValue.value);
        setAddress('');
        typeahead.current?.clear();
        setIsNew(true);
      }
      if(`${actionMeta.action}` == "select-option"){
        setName(newValue.value);
        setChecked(false);
        moveSelectionOfAdresse(newValue.adresse);
        setAddress(newValue.adresse);
        setIsNew(false);
      }
      if(`${actionMeta.action}` == "clear"){
        setName('');
        setAddress('');
        typeahead.current?.clear();
        setIsNew(false);
      }
    };

  const handleInputNomChange = (inputValue, actionMeta) => {
  };

  const handleSearchAdresse = (query) => {
  setIsAdresseLoading(true);

  axios.get(`${REACT_APP_ADRESSE_API_URL}?${REACT_APP_ADRESSE_API_PARAMS}&q=${query}&limit=10`, {transformRequest: (data, headers) => {
        delete headers.common['Authorization'];
        return data;
        }
      })
    .then(function (response){
      const items = response.data.features;
      const options = items.map((i) => ({
        id: i.properties.id,
        adresse: i.properties.label,
        coordinates: i.geometry.coordinates
      }));

      if(options.length){
        setOptionsAdresse(options);
        setAddress(options[0].adresse);
        setLon(options[0].coordinates[0]);
        setLat(options[0].coordinates[1]);
        setIsAdresseLoading(false);
        }
    });
};

  const handleSave = () => {
      setIsSaving(true);
      if(isNew){
        let formData = new FormData()
        formData.append("address",address.selected[0].adresse)
        formData.append("name", name)
        formData.append("lon", lon)
        formData.append("lat", lat)
        axios.post('/identification/utilisateur', formData)
            .then(function (response) {
              let utilisateur = response.data
              Swal.fire({
                  icon: 'success',
                  title: 'Bienvenue '+utilisateur.nom+'!',
                  showConfirmButton: false,
                  timer: 1500
              })
              setName('');
              setAddress('');
              setIsSaving(false);
              cookies.set('utilisateur', utilisateur.id, { path: '/' });
              history.push('/');
              handleClose();
            })
            .catch(function (error) {
              Swal.fire({
                  icon: 'error',
                  title: 'Un problème est survenu!',
                  showConfirmButton: false,
                  timer: 1500
              })
              setIsSaving(false);
        });
      }else{
        const adresseTmp = (address.selected === undefined)? address : address.selected[0].adresse;
        axios.patch(`/identification/utilisateur/${name}`, { address: adresseTmp , lon : lon, lat: lat})
          .then(function (response) {
            cookies.set('utilisateur', name, { path: '/' });
            setIsSaving(false);
            handleClose();
            history.push('/');
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        });
      }
  }

  const filterBy = () => true;

  return (
    <div>
      <Button className="utilisateur-popup" onClick={handleShow}>
        {props.linkText}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <form>
        <Modal.Body>
                <div className="row">
                    <div className="col-sm">
                      <div className="form-group">
                              <CreatableSelect
                                isClearable
                                onChange={handleNomChange}
                                onInputChange={handleInputNomChange}
                                options={utilisateursOptions}
                                id="name"
                                name="name"
                                placeholder="votre prénom"
                                formatCreateLabel={(inputText) => `"Création : ${inputText}"`}
                                defaultValue={ props.user &&
                                    { value: props.user, label: props.userName }
                                  }
                                />
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                      <br/>
                      <div className="form-group">
                      <label>
                        Mettre à jour l'adresse ? {"  "}
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={handleChangeCheckbox}
                          />
                        </label>
                        <br/>
                      </div>
                    </div>
                  </div>
                  {!checked &&
                  <div className="row">
                      <div className="col-sm">
                        <div className="form-group">
                        <input
                          type="text"
                          className = "form-control"
                          value={address}
                          disabled="disabled" />
                        </div>
                      </div>
                  </div>
                  }
                  {checked &&
                  <div className="row">
                    <div className="col-sm">
                      <div className="form-group">
                      <AsyncTypeahead ref={typeahead}
                        id="adresse"
                        name="adresse"
                        onChange={(s)=>{setAddress({ selected: s})}}
                        value={address}
                        filterBy={filterBy}
                        isLoading={isAdresseLoading}
                        labelKey="adresse"
                        minLength={3}
                        onSearch={handleSearchAdresse}
                        options={optionsAdresse}
                        defaultSelected={selectedAdresse}
                        placeholder="Votre adresse..."
                        renderMenuItemChildren={(option, props) => (
                          <React.Fragment>
                            <span>{option.adresse}</span>
                          </React.Fragment>
                        )}
                      />
                    </div>
                  </div>
                </div>
                }

        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button disabled={isSaving}
                    onClick={handleSave}
                    className="btn btn-primary">
              Enregistrer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default UtilisateurModal;
