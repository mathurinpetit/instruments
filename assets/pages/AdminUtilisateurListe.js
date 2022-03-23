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
import AdminUtilisateurCreate from "./AdminUtilisateurCreate"
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
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
              axios.delete(`/admin/utilisateur/${id}`)
              .then(function (response) {
                  Swal.fire({
                      icon: 'success',
                      title: 'Utilisateur deleted successfully!',
                      showConfirmButton: false,
                      timer: 1500
                  })
                  fetchUtilisateursList()
              })
              .catch(function (error) {
                  Swal.fire({
                      icon: 'error',
                      title: 'An Error Occured!',
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
          <h2 className="text-center mt-5 mb-3">Gestion Utilisateurs</h2>
              <div className="card">
                  <div className="card-header">
                      <Link
                          className="btn btn-outline-primary"
                          to="/admin/utilisateur/create">Ajouter un utilisateur
                      </Link>
                  </div>
                  <div className="card-body">

                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Nom</th>
                                  <th>Adresse</th>
                                  <th>Instruments</th>
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {utilisateursList.map((utilisateur, key)=>{
                                  return (
                                      <tr key={key}>
                                          <td>{utilisateur.name}</td>
                                          <td>{utilisateur.address}</td>
                                          <td>
                                            {utilisateur.instruments.map((instrument, k)=>{
                                                return (
                                                  <Badge pill bg="secondary"  key={k} >{instrument.nom}</Badge>
                                                ) }) }
                                          </td>
                                          <td>
                                              <Link
                                                  className="btn btn-outline-success mx-1"
                                                  to={`/admin/utilisateur/edit/${utilisateur.id}`}>
                                                  Modifier
                                              </Link>
                                              <button
                                                  onClick={()=>handleDelete(utilisateur.id)}
                                                  className="btn btn-outline-danger mx-1">
                                                  Supprimer
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
