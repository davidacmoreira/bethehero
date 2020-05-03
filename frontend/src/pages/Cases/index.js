import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Cases() {
    const [cases, setCases] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('cases', {
            params: {
                organization_id: localStorage.getItem('organizationId')
            }
        }).then(response => {
            setCases(response.data);
        });
    }, []);

    async function handleDeleteCase(id) {
        try {
            await api.delete(`cases/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('organizationId')
                }
            });

            setCases(cases.filter(c => c.id !== id));

        } catch (err) {
            alert('fail delete case');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="cases-container">
            <header>
                <img src={logoImg} alt="be the hero"/>
                <span>welcome, {localStorage.getItem('organizationName')}</span>
                <Link className="button" to="/cases/new">new case</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>cases</h1>

            <ul>
                {cases.map(c => (
                    <li key={c.id}>
                        <strong>case:</strong>
                        <p>{c.title}</p>

                        <strong>description:</strong>
                        <p>{c.description}</p>
                        
                        <strong>value</strong>
                        <p>{Intl.NumberFormat('PT', { style: 'currency', currency: 'EUR' }).format(c.value)}</p>

                        <span>
                            <Link to={{ pathname: "/cases/edit", caseProps: c }}>
                                <button type="button">
                                    <FiEdit size={20} color="#a8a8b3" />
                                </button>
                            </Link>
                            <button type="button" onClick={() => handleDeleteCase(c.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}