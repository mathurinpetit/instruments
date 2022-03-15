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
import Swal from 'sweetalert2'
import AdminUtilisateurCreate from "./AdminUtilisateurCreate"
import AdminUtilisateurEdit from "./AdminUtilisateurEdit"

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
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <img className="bi me-2" width="200" height="60" src="../logo.png" />
            <span className="fs-4">Application</span>
          </Link>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link aria-current="page"
                  className="nav-link"
                  to="/">Utilisateurs
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
                  className="nav-link active"
                to="/admin/espace">
                <ion-icon name="lock-closed"></ion-icon>
              </Link>
            </li>
          </ul>
        </header>
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
