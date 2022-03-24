import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Menu from "./Menu"

function AdminInstrumentEdit() {

    const history = useHistory();
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        axios.get(`/admin/instrument/${id}`)
        .then(function (response) {
            let instrument = response.data
            setName(instrument.name);
            setDescription(instrument.description);
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })

    }, [])


    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/admin/instrument/${id}`, {
            name: name,
            description: description
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Instrument mis à jour !',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            history.push('/admin/instrument/liste');
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        });
    }


    return (
        <Layout>
          <Menu active="admin" />
                <h2 className="text-center mt-5 mb-3">Édition d'un instrument</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-primary float-right"
                            to="/admin/instrument/liste">Retour à la liste
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(event)=>{setDescription(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"></textarea>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-success mt-3">
                                Enregistrer
                            </button>
                        </form>
                    </div>
                </div>
        </Layout>
    );
}

export default AdminInstrumentEdit;
