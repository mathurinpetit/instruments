import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Cookies from 'universal-cookie';
import UtilisateurModal from "./UtilisateurModal"
import Menu from "./Menu"

function EmpruntListe() {
    const cookies = new Cookies();
    const [instrumentsList, setInstrumentsList] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [userCookie, setUserCookie] = useState(cookies.get('utilisateur'))
    const [utilisateurName, setUtilisateurName] = useState('')
    const [utilisateurAdresse, setUtilisateurAdresse] = useState('')
    const [utilisateurLat, setUtilisateurLat] = useState('')
    const [utilisateurLon, setUtilisateurLon] = useState('')


    useEffect(() => {
        fetchInstrumentList();
        if(userCookie){
          fetchUtilisateur(userCookie);
        }
    }, [])

    const fetchInstrumentList = () => {
        axios.get('/emprunt/instrument')
        .then(function (response) {
          setInstrumentsList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const fetchUtilisateur = (id) => {
      axios.get(`/identification/utilisateur/${id}`)
      .then(function (response) {
          let utilisateur = response.data;
          if(utilisateur !== 'false'){
            setUtilisateurName(utilisateur.name);
            setUtilisateurAdresse(utilisateur.address);
            setUtilisateurLat(utilisateur.lat);
            setUtilisateurLon(utilisateur.lon);
          }else{
            cookies.set('utilisateur', '', { path: '/' });
            window.location.reload();
          }
      })
      .catch(function (error) {
          console.log(error);
      })
    }

    const handleAction = (id,emprunte) => {
        const idUser = cookies.get('utilisateur');
        Swal.fire({
            title: emprunte ? "Je rend ?" : "J'emprunte ?",
            text: emprunte ? "Voulez-vous rendre l'instrument ?" : "Voulez-vous emprunter l'instrument ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: emprunte ? "Oui je rend l'instrument !" : "Oui j'emprunte cet instrument !",
          }).then((result) => {
              if (result.isConfirmed) {
                setIsSaving(true);
                axios.patch(`/emprunt/instrument/${id}`,{ idUser : cookies.get('utilisateur') })
                .then(function (response) {
                    if(response.data.success){
                      Swal.fire({
                          icon: 'success',
                          title: emprunte ? ""+response.data.type+" "+response.data.name+" rendu !" : ""+response.data.type+" "+response.data.name+" emprunté !",
                          showConfirmButton: false,
                          timer: 1500
                      });
                    }else{
                      Swal.fire({
                          icon: 'error',
                          title: response.data.text,
                          showConfirmButton: false,
                          timer: 1500
                        });
                    }
                    setIsSaving(false);
                    fetchInstrumentList();
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Une erreur est survenue!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsSaving(false);
                });
              }
            });
    }

    return (
        <Layout>
          <Menu active="instrus" />
          <h2 className="text-center mt-5 mb-3">Bienvenue {utilisateurName} !</h2>
          { utilisateurAdresse &&
            <h4 className="text-center mt-5 mb-3"><small>{utilisateurAdresse}&nbsp;
              <a className="btn btn-sm btn-primary" target="_blank" href={"https://maps.google.com/?q="+utilisateurLat+","+utilisateurLon} >
                <ion-icon name="map-outline"></ion-icon>
              </a></small>
            </h4>
          }
            {userCookie
              ? <UtilisateurModal user={userCookie} userName={utilisateurName} userAddress={utilisateurAdresse}
              linkText="Changer d'utilisateur ou d'adresse"
              title="Changer d'utilisateur ou d'adresse" />
            : <UtilisateurModal user="" userName="" userAddress=""
            linkText="Qui suis-je ?"
            title="Bonjour, qui êtes-vous ?" />
        }
          <h2 className="text-center mt-5 mb-3">Instruments</h2>
            <div className="card">
              <div className="card-body">
                <div className="list-group">
                {instrumentsList.map((instrument, key)=>{
                 const emprunteurIsNotMe = (instrument.emprunte && (instrument.emprunteurId != cookies.get('utilisateur')));
                 return (
                    <div key={key} onClick={()=>handleAction(instrument.id,instrument.emprunte)}
                            className={ emprunteurIsNotMe ? "disabled list-group-item list-group-item-action d-flex gap-3 py-3 " : "list-group-item list-group-item-action d-flex gap-3 py-3 " }
                            aria-current="true">
                      <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 className="mb-0">{instrument.name}</h6>
                          <p className="mb-0 opacity-75">{instrument.description}</p>
                        </div>
                        <small className="opacity-50 text-nowrap">
                          <span className="mb-0">{instrument.emprunte ? 'Emprunté par : ' : 'Disponible'}{ instrument.emprunteurNom }</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            { instrument.emprunteurAdresse &&
                              <a className="btn btn-sm btn-primary" target="_blank" href={"https://maps.google.com/?q="+instrument.emprunteurLat+","+instrument.emprunteurLon} >
                                <ion-icon name="map-outline"></ion-icon>
                              </a>
                            }
                          &nbsp;&nbsp;&nbsp;<span className={(instrument.emprunte ? ' btn emprunte dot' : 'btn libre dot')}></span>
                        </small>
                      </div>
                    </div>
                  )
                  })}
                  </div>
                </div>
              </div>
        </Layout>
    );
}

export default EmpruntListe;
