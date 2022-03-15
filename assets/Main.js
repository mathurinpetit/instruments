import React from 'react';
import ReactDOM from 'react-dom';
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

import AdminUtilisateurListe from "./pages/AdminUtilisateurListe"
import AdminUtilisateurCreate from "./pages/AdminUtilisateurCreate"
import AdminUtilisateurEdit from "./pages/AdminUtilisateurEdit"

function Main() {
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

              <Route path="/admin/utilisateur/liste" component={AdminUtilisateurListe} />
              <Route path="/admin/utilisateur/create"  component={AdminUtilisateurCreate} />
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
