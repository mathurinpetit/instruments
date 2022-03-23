import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function AdminUtilisateurCreate() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData()
        formData.append("name", name)
        formData.append("address", address)
        axios.post('/admin/utilisateur', formData)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Utilisateur ajouté!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setName('');
            setAddress('');
            history.push('/admin/utilisateur/liste');
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Un problème est survenu!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }

    return (
        <Layout>
              <Menu active="admin" />
                <h2 className="text-center mt-5 mb-3">Ajouter un utilisateur</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/admin/utilisateur/liste">Retour à la liste
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                              <div className="col-sm">
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
                              </div>
                              <div className="col-sm">
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
                              </div>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Enregistrer
                            </button>
                        </form>
                    </div>
                </div>
        </Layout>
    );
}

export default AdminUtilisateurCreate;
