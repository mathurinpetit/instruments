import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import { DefaultEditor } from 'react-simple-wysiwyg';
import Menu from "./Menu"

function AdminSondagesEdit() {

    const history = useHistory();

    const [sondages, setSondages] = useState('');
    const [informations, setInformations] = useState('');
    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        axios.get(`/communication/visualisation`)
        .then(function (response) {
          setSondages(response.data.sondages);
          setInformations(response.data.informations);
        })
        .catch(function (error) {
          console.log(error);
        })

    }, [])

    function onChangeInformations(e) {
        setInformations(e.target.value);
    }


    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/admin/communication/edition`, {
            sondages: sondages,
            informations: informations
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'La partie communication a été mise à jour!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            history.push('/admin/sondages/afficher');
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Une erreur est survenue!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
        });
    }


    return (
        <Layout>
          <Menu active="admin" />
                <h2 className="titre text-center mt-5 mb-3">Edition des sondages</h2>
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="description">Sondages</label>
                                <textarea
                                    value={sondages}
                                    onChange={(event)=>{setSondages(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="4"
                                    name="description"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Informations</label>
                                <DefaultEditor value={informations} onChange={onChangeInformations} />
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-success mt-3">
                                Mettre à jour
                            </button>
                        </form>
                    </div>
                </div>
        </Layout>
    );
}

export default AdminSondagesEdit;
