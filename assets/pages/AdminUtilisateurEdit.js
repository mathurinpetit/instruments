import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Menu from "./Menu"

function AdminUtilisateurEdit() {

    const history = useHistory();
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        axios.get(`/admin/utilisateur/${id}`)
        .then(function (response) {
            let utilisateur = response.data
            setName(utilisateur.name);
            setAddress(utilisateur.address);
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
        axios.patch(`/admin/utilisateur/${id}`, {
            name: name,
            address: address
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Utilisateur mis à jour !',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            history.push('/admin/utilisateur/liste');
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
                <h2 className="text-center mt-5 mb-3">Édition d'un utilisateur</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/admin/utilisateur/liste">Retour à la liste
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
                                <label htmlFor="name">Adresse</label>
                                <input
                                    onChange={(event)=>{setAddress(event.target.value)}}
                                    value={address}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Enregistrer
                            </button>
                        </form>
                    </div>
                </div>
        </Layout>
    );
}

export default AdminUtilisateurEdit;
