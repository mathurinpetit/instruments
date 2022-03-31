import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Menu from "./Menu"

function AdminZComme() {
  const  [imgPath, setImgPath] = useState("")
  const  [imgName, setImgName] = useState("")

  const images = [
    {
      "name" : "Zaraï Rica",
      "path" : "rica_zarai.jpg"
    },
    {
      "name" : "Zebulon",
      "path" : "zebulon.jpg"
    },
    {
      "name" : "Zahia",
      "path" : "zahia.jpg"
    },
    {
      "name" : "Le chien de TéléZ",
      "path" : "telez.jpg"
    },
    {
      "name" : "Eric Zemmour",
      "path" : "zemmour.jpg"
    },
    {
      "name" : "Léon Zitrone",
      "path" : "zitrone.jpg"
    },
    {
      "name" : "Zinedine Zidane",
      "path" : "zidane.jpg"
    },
    {
      "name" : "Zylvie Vartan",
      "path" : "zylvie_vartan.jpg"
    },
    {
      "name" : "Zoufris Maracas",
      "path" : "zoufris_maracass.jpg"
    }

  ];

  useEffect(() => {
    var random = Math.floor(Math.random() * images.length);
    var node = images[random];
    setImgPath("../zcomme/"+node.path);
    setImgName(node.name);
  }, [])

    return (
        <Layout>
          <Menu active="admin" />
                <h2 className="text-center mt-5 mb-3">Z . . .  comme . . .</h2>
                <div className="card">
                    <div className="card-header">
                      {imgName}
                    </div>
                    <div className="card-body text-center">
                      <img className="img-fluid"  src={imgPath} alt={imgName} />
                    </div>
                </div>
        </Layout>
    );
}

export default AdminZComme;
