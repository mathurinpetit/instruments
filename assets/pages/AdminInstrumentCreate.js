import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Menu from "./Menu"
import InstrumentsType from "./InstrumentsType"

function AdminInstrumentCreate() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData()
        formData.append("name", name)
        formData.append("type", type)
        formData.append("description", description)
        axios.post('/admin/instrument', formData)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Instrument ajouté!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setName('');
            setType('');
            setDescription('');
            history.push('/admin/instrument/liste');
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
                <h2 className="titre text-center mt-5 mb-3">Ajouter un instrument</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-primary float-right"
                            to="/admin/instrument/liste">Retour à la liste
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
                                    <label htmlFor="type">Type</label>
                                      <select
                                        onChange={(event)=>{setType(event.target.value)}}
                                        className="form-control"
                                        id="type"
                                        name="type"
                                        >
                                        {
                                          InstrumentsType.InstrumentsType.map((type, key)=>{
                                                    return (
                                                    <option key={key} value={type.value}>{type.label}</option>
                                                    );
                                              })
                                        }
                                      </select>
                                </div>
                              </div>
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
                                className="btn btn-primary mt-3">
                                Enregistrer
                            </button>
                        </form>
                    </div>
                </div>
        </Layout>
    );
}

export default AdminInstrumentCreate;
