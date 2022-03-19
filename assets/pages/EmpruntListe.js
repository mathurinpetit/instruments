import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Cookies from 'universal-cookie';
import UtilisateurModal from "./UtilisateurModal"

function EmpruntListe() {
    const cookies = new Cookies();
    const  [instrumentsList, setInstrumentList] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [userCookie, setUserCookie] = useState(cookies.get('utilisateur'))
    const [utilisateurName, setUtilisateurName] = useState('')
    const [utilisateurAdresse, setUtilisateurAdresse] = useState('')


    useEffect(() => {
        fetchInstrumentList();
        if(userCookie){
          fetchUtilisateur(userCookie);
        }
    }, [])

    const fetchInstrumentList = () => {
        axios.get('/emprunt/instrument')
        .then(function (response) {
          setInstrumentList(response.data);
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
                axios.patch(`/emprunt/instrument/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: emprunte ? "L'instrument est rendu !" : "L'instrument est maintenant emprunté !",
                        showConfirmButton: false,
                        timer: 1500
                    })
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
          <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
              <img className="bi me-2" width="200" height="60" src="../logo.png" />
              <span className="fs-4">Application</span>
            </Link>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link aria-current="page"
                    className="nav-link active"
                    to="/">Instruments
                </Link>
              </li>
              <li className="nav-item">
                <Link aria-current="page"
                    className="nav-link"
                    to="/sondages/afficher">Sondages
                </Link>
              </li>
              <li className="nav-item">
                <Link aria-current="page"
                    className="nav-link"
                  to="/admin/espace">
                  <ion-icon name="lock-closed"></ion-icon>
                </Link>
              </li>
            </ul>
          </header>
          {userCookie
                      ? <UtilisateurModal user={userCookie}
                                          linkText="Changer d'utilisateur"
                                          title="Bonjour on sait qui tu es" />
                      : <UtilisateurModal user={userCookie}
                                          linkText="Qui suis-je ?"
                                          title="Bonjour, qui êtes-vous ?" />
          }
          <h2 className="text-center mt-5 mb-3">Bienvenue {utilisateurName} - {utilisateurAdresse}</h2>
          <h2 className="text-center mt-5 mb-3">Instruments</h2>
            <div className="card">
              <div className="card-body">
                <div className="list-group">
                {instrumentsList.map((instrument, key)=>{
                 return (
                    <div  key={key} onClick={()=>handleAction(instrument.id,instrument.emprunte)} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 className="mb-0">{instrument.name}</h6>
                          <p className="mb-0 opacity-75">{instrument.description}</p>
                        </div>
                        <small className="opacity-50 text-nowrap">
                          <span className={(instrument.emprunte ? 'emprunte dot' : 'libre dot')}></span>
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
