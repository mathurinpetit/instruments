import React from 'react';
import ReactDOM from 'react-dom';
import {Buffer} from 'buffer';
import Cookies from 'universal-cookie';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import EmpruntListe from "./pages/EmpruntListe"
import Sondages from "./pages/Sondages"

import Admin from "./pages/Admin"

import AdminInstrumentListe from "./pages/AdminInstrumentListe"
import AdminInstrumentCreate from "./pages/AdminInstrumentCreate"
import AdminInstrumentEdit from "./pages/AdminInstrumentEdit"

import AdminSondages from "./pages/AdminSondages"
import AdminSondagesEdit from "./pages/AdminSondagesEdit"

import CarteGlobale from "./pages/CarteGlobale"

import AdminUtilisateurListe from "./pages/AdminUtilisateurListe"
import AdminUtilisateurEdit from "./pages/AdminUtilisateurEdit"

import AdminListeStudio from "./pages/AdminListeStudio"
import AdminZComme from "./pages/AdminZComme" 

function Main() {

  let axiosDefaults = require('axios/lib/defaults');
  axiosDefaults.baseURL = process.env.REACT_APP_API_URL;
  const username = process.env.REACT_APP_API_USERNAME;
  const password = process.env.REACT_APP_API_PASSWORD;

  axiosDefaults.headers.common['Authorization'] = 'Basic ' + Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

  const cookies = new Cookies();
  if(typeof cookies.get('utilisateur') === 'undefined') {
    cookies.set('utilisateur', '', { path: '/' });
  }

  return (
       <div className="App">
         <header className="App-header">
           <Router>
            <Switch>
                <Route exact path="/"  component={EmpruntListe} />
                <Route path="/sondages/afficher"  component={Sondages} />

                <Route path="/admin/espace"  component={Admin} />
                <Route path="/admin/instrument/liste" component={AdminInstrumentListe} />
                <Route path="/admin/instrument/create"  component={AdminInstrumentCreate} />
                <Route path="/admin/instrument/edit/:id"  component={AdminInstrumentEdit} />

                <Route path="/admin/sondages/afficher" component={AdminSondages} />
                <Route path="/admin/sondages/edit" component={AdminSondagesEdit} />

                <Route path="/admin/listestudio" component={AdminListeStudio} />
                <Route path="/admin/zcomme" component={AdminZComme} />

                <Route path="/carte/afficher" component={CarteGlobale} />

                <Route path="/admin/utilisateur/liste" component={AdminUtilisateurListe} />
                <Route path="/admin/utilisateur/edit/:id"  component={AdminUtilisateurEdit} />
            </Switch>
          </Router>
       </header>
      </div>
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
