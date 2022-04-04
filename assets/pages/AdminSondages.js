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
import DOMPurify from 'dompurify';
import AdminInstrumentEdit from "./AdminInstrumentEdit"


function AdminSondages() {
  const  [sondages, setSondages] = useState([])
  const  [informations, setInformations] = useState([])

  useEffect(() => {
      fetchCommunication()
  }, [])



  const createMarkup = (html) => {
   return  {
    __html: DOMPurify.sanitize(html)
   }
  }

  const fetchCommunication = () => {
      axios.get('/communication/visualisation')
      .then(function (response) {
        setSondages(response.data.sondages);
        setInformations(response.data.informations);
      })
      .catch(function (error) {
        console.log(error);
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
              <h2 className="text-center titre ">Gestion Communication</h2>
            </div>
            <div className="col">
            </div>
          </div>
          <br/>
              <div className="card">
                <div className="card-header">
                <Link
                    className="btn btn-success mx-1"
                    to={`/admin/sondages/edit`}>
                    Modifier
                </Link>
              </div>
                  <div className="card-body">

                      <table className="table table-bordered sondages">
                          <thead>
                              <tr>
                                  <th>Sondages</th>
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
                                      </tr>
                          </tbody>
                        </table>
                        <br/>
                        <table className="table table-bordered sondages">
                            <thead>
                              <tr>
                                <th>Informations</th>
                                </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                     <td>
                                        <div className="informations" dangerouslySetInnerHTML={createMarkup(informations)}>
                                        </div>
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
