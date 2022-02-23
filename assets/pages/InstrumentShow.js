import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import axios from 'axios';

function InstrumentShow() {
    const [id, setId] = useState(useParams().id)
    const [project, setInstrument] = useState({name:'', description:''})
    useEffect(() => {
        axios.get(`/api/instrument/${id}`)
        .then(function (response) {
          setInstrument(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])

    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Show Instrument</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Instruments
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{project.name}</p>
                        <b className="text-muted">Description:</b>
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default InstrumentShow;
