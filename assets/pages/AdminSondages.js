import React,{ useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Linkify from 'react-linkify';
import Layout from "../components/Layout"
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import axios from 'axios';
import Swal from 'sweetalert2'

import AdminInstrumentEdit from "./AdminInstrumentEdit"


function AdminSondages() {
  const  [sondages, setSondages] = useState([])

  useEffect(() => {
      fetchSondages()
  }, [])

  const fetchSondages = () => {
      axios.get('/sondages/visualisation')
      .then(function (response) {
        setSondages(response.data);
      })
      .catch(function (error) {
        console.log(error);
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
                  className="nav-link active"
                to="/admin/espace">
                <ion-icon name="lock-closed"></ion-icon>
              </Link>
            </li>
          </ul>
        </header>
          <h2 className="text-center mt-5 mb-3">Gestion sondages</h2>
              <div className="card">
                  <div className="card-body">

                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Sondages</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                                      <tr>
                                          <td>
                                            <Linkify>
                                            { (sondages+"").split('\n').map((line, key) => {
                                              return (
                                                <span  key={key}  >
                                                  {line}
                                                  <br/>
                                                </span>
                                            )
                                            })}
                                            </Linkify>
                                          </td>
                                          <td>
                                              <Link
                                                  className="btn btn-outline-success mx-1"
                                                  to={`/admin/sondages/edit`}>
                                                  Modifier
                                              </Link>
                                          </td>
                                      </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
      </Layout>
  );
}

export default AdminSondages;