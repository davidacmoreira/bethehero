import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Cases from './pages/Cases';
import NewCase from './pages/NewCase';
import EditCase from './pages/EditCase';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/cases/all" component={Cases} />
                <Route path="/cases/new" component={NewCase} />
                <Route path="/cases/edit" component={EditCase} />
            </Switch>
        </BrowserRouter>
    );
}