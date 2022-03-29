import React,{ useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Layout from "../components/Layout"
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import axios from 'axios';
import Swal from 'sweetalert2';
import { Badge } from 'react-bootstrap';
import AdminUtilisateurEdit from "./AdminUtilisateurEdit"
import Menu from "./Menu"

function AdminUtilisateurListe() {
  const  [utilisateursList, setUtilisateursList] = useState([])

  useEffect(() => {
      fetchUtilisateursList()
  }, [])

  const fetchUtilisateursList = () => {
      axios.get('/admin/utilisateur')
      .then(function (response) {
        setUtilisateursList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleDelete = (id) => {
      Swal.fire({
          title: 'Êtes vous sûrs?',
          text: "Après cette opération, il ne sera pas possible de revenir en arrière!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonText: "Annuler",
          confirmButtonText: 'Oui, je supprime!'
        }).then((result) => {
          if (result.isConfirmed) {
              axios.delete(`/admin/utilisateur/${id}`)
              .then(function (response) {
                  Swal.fire({
                      icon: 'success',
                      title: 'Utilisateur supprimé!',
                      showConfirmButton: false,
                      timer: 1500
                  })
                  fetchUtilisateursList()
              })
              .catch(function (error) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Une erreur est survenue!',
                      showConfirmButton: false,
                      timer: 1500
                  })
              });
          }
        })
  }

  return (
      <Layout>
        <Menu active="admin" />
          <div className="d-flex">
            <div className="col">
              <Link
                className="btn btn-sm btn-light"
                to="/admin/espace">
                <ion-icon name="arrow-back-outline"></ion-icon>&nbsp;&nbsp;
                Retour
              </Link>
            </div>
            <div className="col">
              <h2 className="text-center">Gestion Utilisateurs</h2>
            </div>
            <div className="col">
            </div>
          </div>
          <br/>
              <div className="card">
                  <div className="card-body">

                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Nom</th>
                                  <th>Instruments</th>
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {utilisateursList.map((utilisateur, key)=>{
                                  return (
                                      <tr key={key}>
                                          <td>{utilisateur.name}<br/>
                                              {utilisateur.address}</td>
                                          <td>
                                            {utilisateur.instruments.map((instrument, k)=>{
                                                return (
                                                  <Badge pill bg="secondary"  key={k} >{instrument.nom}</Badge>
                                                ) }) }
                                          </td>
                                          <td>
                                              <Link
                                                  style={{margin: '10px'}}
                                                  className="btn btn-success mx-1"
                                                  to={`/admin/utilisateur/edit/${utilisateur.id}`}>
                                                  <ion-icon name="create-outline"></ion-icon>
                                              </Link>
                                              <button
                                                  style={{margin: '10px'}}
                                                  onClick={()=>handleDelete(utilisateur.id)}
                                                  className="btn btn-danger mx-1">
                                                  <ion-icon name="trash-outline"></ion-icon>
                                              </button>
                                          </td>
                                      </tr>
                                  )
                              })}
                          </tbody>
                      </table>
                  </div>
              </div>
      </Layout>
  );
}

export default AdminUtilisateurListe;
