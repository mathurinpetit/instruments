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
import Menu from "./Menu"

function Admin() {
    return (
        <Layout>
            <Menu active="admin" />
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
