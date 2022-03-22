import React from 'react';
import Layout from "../components/Layout"
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Swal from 'sweetalert2'
import axios from 'axios';

function Admin() {
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

                <h2 className="text-center mt-5 mb-3">Gestion instruments</h2>
                <div className="card">
                    <div className="card-body">
                      ICI LA LISTE DES INSTRU
                      <br/>
                      <Link
                        className="btn btn-outline-primary"
                        to="/admin/instrument/liste">Gestion instruments</Link>
                    </div>
                </div>
                <h2 className="text-center mt-5 mb-3">Gestion Sondages</h2>
                <div className="card">
                    <div className="card-body">
                      ICI LES SONDAGES DISPOS
                      <br/>
                      <Link
                        className="btn btn-outline-primary"
                        to="/admin/sondages/afficher">Gestion Sondages</Link>
                    </div>
                </div>
                <h2 className="text-center mt-5 mb-3">Gestion Utilisateurs</h2>
                <div className="card">
                    <div className="card-body">
                      ICI LES UTILISATEURS
                      <br/>
                      <Link
                        className="btn btn-outline-primary"
                        to="/admin/utilisateur/liste">Gestion Utilisateurs</Link>
                    </div>
                </div>
        </Layout>
    );
}

export default Admin;
