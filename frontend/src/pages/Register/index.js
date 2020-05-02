import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {name, city, email, whatsapp};

        try {
            const response = await api.post('organizations', data);
            alert(`id: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('fail register');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="be the hero" />
                    <h1>register</h1>
                    <p>registe your organization</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
                    <input placeholder="city" value={city} onChange={e => setCity(e.target.value)} />
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    <button className="button" type="submit">register</button>
                </form>
            </div>
        </div>
    );
}