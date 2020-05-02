import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewCase() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewCase(e) {
        e.preventDefault();

        const data = {title, description, value};

        try {
            await api.post('cases', data, {
                headers: {
                    Authorization: localStorage.getItem('organizationId')
                },
                data
            }
            );
            
            history.push('/cases/all');

        } catch (err) {
            alert('fail new case')
        }

    }

    return (
        <div className="new-case-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="be the hero" />
                    <h1>register case</h1>
                    <p>registe case</p>
                    <Link className="back-link" to="/cases/all">
                        <FiArrowLeft size={16} color="#E02041" />
                        home
                    </Link>
                </section>

                <form onSubmit={handleNewCase}>
                    <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="value" value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button" type="submit">register</button>
                </form>
            </div>
        </div>
    );
}