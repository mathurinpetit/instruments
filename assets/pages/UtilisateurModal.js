import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from 'sweetalert2';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';

function UtilisateurModal(props) {

  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);
  const [utilisateursOptions, setUtilisateursOptions] = useState([])
  const [name, setName] = useState('');
  const [address, setAddress] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isNew, setIsNew] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  }
  const handleShow = () => {
    setShow(true);
    setAddress(props.userAddress);
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
        setIsNew(true);
      }
      if(`${actionMeta.action}` == "select-option"){
        setName(newValue.value);
        setAddress(newValue.adresse);
        setIsNew(false);
      }
      if(`${actionMeta.action}` == "clear"){
        setName('');
        setAddress('');
        setIsNew(false);
      }
    };

  const handleInputNomChange = (inputValue, actionMeta) => {
  };

  const handleSave = () => {
      setIsSaving(true);
      let formData = new FormData()
        formData.append("address", address)
        formData.append("name", name)
      if(isNew){
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
        axios.patch(`/identification/utilisateur/${name}`, { address: address })
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
                              defaultValue={{ value: props.user, label: props.userName }}
                            />
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-group">
                      <input
                          onChange={(event)=>{setAddress(event.target.value)}}
                          value={address}
                          type="text"
                          className="form-control"
                          id="adresse"
                          name="adresse"
                          placeholder="votre adresse"
                          />
                      </div>
                    </div>
                  </div>
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
