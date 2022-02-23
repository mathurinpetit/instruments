import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function InstrumentList() {
    const  [instrumentsList, setInstrumentList] = useState([])

    useEffect(() => {
        fetchInstrumentList()
    }, [])

    const fetchInstrumentList = () => {
        axios.get('/api/instrument')
        .then(function (response) {
          setInstrumentList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/instrument/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Instrument deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchInstrumentList()
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }

    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Gestion instruments</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Ajouter un instrument
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instrumentsList.map((instrument, key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{instrument.name}</td>
                                            <td>{instrument.type}</td>
                                            <td>{instrument.description}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${instrument.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${instrument.id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={()=>handleDelete(instrument.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default InstrumentList;
