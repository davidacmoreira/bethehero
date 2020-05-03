import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function EditCase(props) {
    const c = props.location.caseProps;
    
    const [title, setTitle] = useState(c.title);
    const [description, setDescription] = useState(c.description);
    const [value, setValue] = useState(c.value);

    const history = useHistory();

    async function handleEditCase(e) {
        e.preventDefault();

        const data = {title, description, value};

        try {
            await api.put(`cases/${c.id}`, data, {
                headers: {
                    Authorization: localStorage.getItem('organizationId')
                },
                data
            }
            );
            
            history.push('/cases/all');

        } catch (err) {
            alert('fail edit case')
        }

    };

    return (
        <div className="edit-case-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="be the hero" />
                    <h1>edit case</h1>
                    {/*<p>edit case</p>*/}
                    <Link className="back-link" to="/cases/all">
                        <FiArrowLeft size={16} color="#E02041" />
                        home
                    </Link>
                </section>

                <form onSubmit={handleEditCase}>
                    <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="value" value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button" type="submit">edit</button>
                </form>
            </div>
        </div>
    );
}