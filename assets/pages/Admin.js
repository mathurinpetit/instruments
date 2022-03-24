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

            <br/>
            <div className="row">
              <div className="col-sm text-center">
                <Link
                  className="btn btn-lg btn-light"
                  to="/admin/listestudio">Instruments au studio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <ion-icon name="arrow-forward-outline"></ion-icon></Link>

                </div>
              </div>
                      <br/>
                        <div className="row">
                          <div className="col-sm text-center">
                      <Link
                        className="btn btn-lg btn-light"
                        to="/admin/instrument/liste">Gestion instruments&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ion-icon name="arrow-forward-outline"></ion-icon></Link>

                    </div>
                    </div>
                    <br/>
                      <div className="row">
                        <div className="col-sm text-center">
                      <Link
                        className="btn btn-lg btn-light"
                        to="/admin/sondages/afficher">Gestion Sondages&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ion-icon name="arrow-forward-outline"></ion-icon></Link>

                      </div>
                      </div>
                      <br/>
                        <div className="row">
                          <div className="col-sm text-center">
                      <Link
                        className="btn btn-lg btn-light"
                        to="/admin/utilisateur/liste">Gestion Utilisateurs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                        </div>
                      </div>
        </Layout>
    );
}

export default Admin;
