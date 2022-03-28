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
          <h2 className="text-center mt-5 mb-3">Gestion communication</h2>
              <div className="card">
                  <div className="card-body">

                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Communication</th>
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

                                          <td rowSpan={2}>
                                              <Link
                                                  className="btn btn-success mx-1"
                                                  to={`/admin/sondages/edit`}>
                                                  Modifier
                                              </Link>
                                          </td>
                                      </tr>
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
