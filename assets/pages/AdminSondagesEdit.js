import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Menu from "./Menu"

function AdminSondagesEdit() {

    const history = useHistory();

    const [sondage, setSondage] = useState('');
    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        axios.get(`/sondages/visualisation`)
        .then(function (response) {
          setSondage(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })

    }, [])


    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/admin/sondages/edition`, {
            sondage: sondage
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Les sondages ont étés mis à jour!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            history.push('/admin/sondages/afficher');
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
        });
    }


    return (
        <Layout>
          <Menu active="admin" />
                <h2 className="text-center mt-5 mb-3">Edition des sondages</h2>
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="description">Sondage</label>
                                <textarea
                                    value={sondage}
                                    onChange={(event)=>{setSondage(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="4"
                                    name="description"></textarea>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Mettre à jour
                            </button>
                        </form>
                    </div>
                </div>
        </Layout>
    );
}

export default AdminSondagesEdit;
