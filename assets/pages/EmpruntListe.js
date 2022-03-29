import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Cookies from 'universal-cookie';
import UtilisateurModal from "./UtilisateurModal";
import Menu from "./Menu";
import EmpruntInstrumentItem from "./EmpruntInstrumentItem";

function EmpruntListe() {
    const cookies = new Cookies();
    const [instrumentsList, setInstrumentsList] = useState([])
    const [instrumentsEmprunteList, setInstrumentsEmprunteList] = useState([])

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
          const myInstruments = [];
          const otherInstruments = [];

          response.data.forEach((item, i) => {
            if(item.emprunteurId === userCookie){
              myInstruments.push(item);
            }else{
              otherInstruments.push(item);
            }
          });
          setInstrumentsEmprunteList(myInstruments);
          setInstrumentsList(otherInstruments);
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

    const openPopupLocalMap = (event) => {
      event.stopPropagation();
      event.preventDefault();

    }

    const handleAction = (instrument) => {
        const idUser = cookies.get('utilisateur');

        const id = instrument.id;
        const emprunte = instrument.emprunte;
        const emprunteParMoi = (instrument.emprunteurId === idUser  );

        let sawlTitle = "J'emprunte ?";
        let sawlText = "Voulez-vous emprunter l'instrument ?";
        let swalConfirmText = "Oui j'emprunte cet instrument !";

        if(emprunte && emprunteParMoi){
          sawlTitle = "Je rend ?";
          sawlText = "Voulez-vous rendre l'instrument ?";
          swalConfirmText = "Oui je rend l'instrument !";
        }

        if(emprunte && !emprunteParMoi){
          sawlTitle = instrument.emprunteurNom+" me passe l'instrument "+instrument.name;
          sawlText = "J'ai vu avec "+instrument.emprunteurNom;
          swalConfirmText = "Oui je prend cet instrument !";
        }

        Swal.fire({
            title: sawlTitle,
            text: sawlText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: "Annuler",
            confirmButtonText: swalConfirmText,
          }).then((result) => {
              if (result.isConfirmed) {
                setIsSaving(true);
                axios.patch(`/emprunt/instrument/${id}`,{ idUser : cookies.get('utilisateur') })
                .then(function (response) {
                    if(response.data.success){
                      if(!response.data.echange){
                        Swal.fire({
                            icon: 'success',
                            title: emprunte ? ""+response.data.type+" "+response.data.name+" rendu !" : ""+response.data.type+" "+response.data.name+" emprunté !",
                            showConfirmButton: false,
                            timer: 1500
                        });
                      }else{
                        Swal.fire({
                            icon: 'success',
                            title: response.data.text,
                            showConfirmButton: false,
                            timer: 1500
                        });
                      }
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
          <h2 className="adresseName text-center mt-5 mb-3">Bienvenue {utilisateurName} !</h2>
          { utilisateurAdresse &&
            <h4 className="adresseLigne text-center mt-5 mb-3"><small>{utilisateurAdresse}</small>
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

        {instrumentsEmprunteList.length > 0 &&
        <h2 className="text-center mt-5 mb-3">Mes emprunts</h2>
        }
        {instrumentsEmprunteList.length > 0 &&
          <div className="card">
            <div className="card-body">
              <div className="list-group">
              {instrumentsEmprunteList.map((instrument, key)=>{
               return (
                  <div key={key} onClick={()=>handleAction(instrument)}
                          className="list-group-item list-group-item-action d-flex"
                          aria-current="true"
                          role="button" >
                      <EmpruntInstrumentItem instrument={instrument} emprunteParMoi={true} />
                  </div>
                )
                })}
                </div>
              </div>
            </div>
          }

          <h2 className="text-center mt-5 mb-3">{(instrumentsEmprunteList.length > 0)? "Autres instruments" : "Instruments" }</h2>
            <div className="card">
              <div className="card-body">
                <div className="list-group">
                {instrumentsList.map((instrument, key)=>{
                 return (
                    <div key={key} onClick={()=>handleAction(instrument)}
                            className="list-group-item list-group-item-action d-flex"
                            aria-current="true"
                            role="button" >
                            <EmpruntInstrumentItem instrument={instrument} emprunteParMoi={false} />
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
