import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import InstrumentList from "./pages/InstrumentList"
import InstrumentCreate from "./pages/InstrumentCreate"
import InstrumentEdit from "./pages/InstrumentEdit"
import InstrumentShow from "./pages/InstrumentShow"

function Main() {
    return (
       <div className="App">
         <header className="App-header">
           <Router>
            <Switch>
                <Route exact path="/"  component={InstrumentList} />
                <Route path="/create"  component={InstrumentCreate} />
                <Route path="/edit/:id"  component={InstrumentEdit} />
                <Route path="/show/:id"  component={InstrumentShow} />
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
