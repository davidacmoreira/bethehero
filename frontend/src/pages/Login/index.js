import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('organizationId', id);
            localStorage.setItem('organizationName', response.data.name);

            history.push('/cases/all');
        } catch (err) {
            alert('fail login');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="be the hero" />

                <form onSubmit={handleLogin}>
                    <h1>login</h1>
                    <input placeholder='id' value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">enter</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        register
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes" />
        </div>
    );
}