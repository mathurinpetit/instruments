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
import AdminInstrumentCreate from "./AdminInstrumentCreate"
import AdminInstrumentEdit from "./AdminInstrumentEdit"
import Menu from "./Menu"

function AdminInstrumentListe() {
  const  [instrumentsList, setInstrumentList] = useState([])

  useEffect(() => {
      fetchInstrumentList()
  }, [])

  const fetchInstrumentList = () => {
      axios.get('/admin/instrument')
      .then(function (response) {
        setInstrumentList(response.data);
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
              axios.delete(`/admin/instrument/${id}`)
              .then(function (response) {
                  Swal.fire({
                      icon: 'success',
                      title: 'Instrument supprimé!',
                      showConfirmButton: false,
                      timer: 1500
                  })
                  fetchInstrumentList()
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
              <h2 className="text-center titre ">Gestion Instruments</h2>
            </div>
            <div className="col">
            </div>
          </div>
          <br/>
              <div className="card">
                  <div className="card-header">
                      <Link
                          className="btn btn-primary"
                          to="/admin/instrument/create">Ajouter un instrument
                      </Link>
                  </div>
                  <div className="card-body">

                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Nom</th>
                                  <th>Type</th>
                                  <th>Description</th>
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {instrumentsList.map((instrument, key)=>{
                                  return (
                                      <tr key={key}>
                                          <td>{instrument.name}</td>
                                          <td>{instrument.type}</td>
                                          <td>{instrument.description}</td>
                                          <td>
                                              <Link
                                                  className="btn btn-success mx-1"
                                                  to={`/admin/instrument/edit/${instrument.id}`}>
                                                  <ion-icon name="create-outline"></ion-icon>
                                              </Link>
                                              <button
                                                  onClick={()=>handleDelete(instrument.id)}
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

export default AdminInstrumentListe;
