import React,{ useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

function Menu(props) {
  const cookies = new Cookies();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCookie, setUserCookie] = useState(cookies.get('utilisateur'))

  useEffect(() => {
      if(userCookie){
        updateIsAdmin(userCookie);
      }
  }, [])

  const updateIsAdmin = (id) => {
    axios.get(`/identification/utilisateur/${id}`)
    .then(function (response) {
        let utilisateur = response.data;
        if(utilisateur !== 'false'){
          setIsAdmin(utilisateur.isAdmin);
        }
    });
  }

  return (
    <header id="mainNav" className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img className="bi me-2" width="200" height="60" src="../logo.png" />
      </Link>
      <ul className="nav">
        <li className="nav-item">
          <Link aria-current="page"
              className={(props.active == "instrus")? "nav-link  active" : "nav-link" }
              to="/">Instrus
          </Link>
        </li>
        <li className="nav-item">
          <Link aria-current="page"
              className={(props.active == "sondages")? "nav-link  active" : "nav-link" }
              to="/sondages/afficher">Communication
          </Link>
        </li>
        <li className="nav-item">
          <Link aria-current="page"
              className={(props.active == "carte")? "nav-link  active" : "nav-link" }
              to="/carte/afficher">Carte
          </Link>
        </li>
        { isAdmin &&
          <li className="nav-item">
            <Link aria-current="page"
                className={(props.active == "admin")? "nav-link  active" : "nav-link" }
              to="/admin/espace">
              <ion-icon name="lock-closed"></ion-icon>
            </Link>
          </li>
        }
      </ul>
    </header>
  );
}

export default Menu;
