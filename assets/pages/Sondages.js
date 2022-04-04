import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Linkify from 'react-linkify';
import DOMPurify from 'dompurify';
import Menu from "./Menu"

function Sondages() {

    const  [sondages, setSondages] = useState([]);
    const  [informations, setInformations] = useState('');

    useEffect(() => {
        fetchCommunication();
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
          <Menu active="sondages" />
          <h2 className="titre text-center mt-5 mb-3">Sondages</h2>
            <div className="card">
                <div className="list-group">
                  <div className="sondages card-body">
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
                <h2 className="titre text-center mt-5 mb-3">Infos</h2>
                  <div className="card">
                      <div className="list-group">
                        <div className="sondages card-body">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div className="informations" dangerouslySetInnerHTML={createMarkup(informations)}>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br/>
                      <br/>
        </Layout>
    );
}

export default Sondages;
