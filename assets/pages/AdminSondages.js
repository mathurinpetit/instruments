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
import Menu from "./Menu"
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
        <Menu active="admin" />
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
