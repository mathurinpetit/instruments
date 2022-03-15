import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Linkify from 'react-linkify';

function Sondages() {

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
                    className="nav-link active"
                    to="/sondages/afficher">Sondages
                </Link>
              </li>
              <li className="nav-item">
                <Link aria-current="page"
                    className="nav-link"
                  to="/admin/espace">
                  <ion-icon name="lock-closed"></ion-icon>
                </Link>
              </li>
            </ul>
          </header>
          <h2 className="text-center mt-5 mb-3">Sondages</h2>
            <div className="card">
              <div className="card-body">
                <div className="list-group">
                      <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 className="mb-0"></h6>
                          <p className="mb-0 opacity-75">

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
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </Layout>
    );
}

export default Sondages;
