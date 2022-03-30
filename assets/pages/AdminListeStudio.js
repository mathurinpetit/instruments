import React,{ useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Layout from "../components/Layout"
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import Menu from "./Menu";
import InstrumentsType from "./InstrumentsType";
import Coupe from "../images/icons/Coupe.png";
import Repik from "../images/icons/Repik.png";
import Caisse from "../images/icons/Caisse.png";
import Marca1 from "../images/icons/Marca1.png";
import Marca2 from "../images/icons/Marca2.png";
import Timbao from "../images/icons/Timbao.png";


function AdminListeStudio() {

  const  [instrumentsList, setInstrumentsList] = useState([])

  useEffect(() => {
      fetchInstrumentsStudioList()
  }, [])


  const fetchInstrumentsStudioList = () => {
    axios.get('/emprunt/instrument')
    .then(function (response) {
      const auStudio = [];

      InstrumentsType.InstrumentsType.map((type, key)=>{
        let typeInstru = type.value;



        if(typeInstru){

          let instruByTypes = {
                              'type' : typeInstru,
                              'instruments' :  response.data.filter(item => {
                                                  if (item.type === typeInstru && !item.emprunte){
                                                    return true;
                                                  }
                                                  return false;
                                                 })
                              };

          auStudio.push(instruByTypes);

        }
      });
      setInstrumentsList(auStudio);
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
              <h2 className="text-center">Au studio</h2>
            </div>
            <div className="col">
            </div>
          </div>
          <br/>
              <div className="card">
                <div className="card-header">
                <h2>Liste des instruments disponibles au studio</h2>
              </div>
                  <div className="card-body">
                  {instrumentsList.map((instrumentsByType, key)=>{
                         return (
                           <table className="table table-bordered" key={key}>
                               <thead>
                                   <tr>
                                       <th>{instrumentsByType.type} <span className="badge rounded-pill bg-danger float-end">{instrumentsByType.instruments.length}</span></th>
                                   </tr>
                               </thead>
                               <tbody>
                                  <tr>
                                     <td>
                                       {instrumentsByType.instruments.map((instrument, k)=>{
                                         return (
                                         <img className="" width="100" height="100" key={k} src={"../icons/"+`${instrument.type}`+".png"} alt={instrument.name} />
                                         )
                                        })
                                        }
                                     </td>
                                  </tr>
                               </tbody>
                           </table>
                         )
                     })
                   }
                  </div>
              </div>
      </Layout>
  );
}

export default AdminListeStudio;
