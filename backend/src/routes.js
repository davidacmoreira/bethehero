const express = require('express');

const OrganizationController = require('./controllers/OrganizationController');
const CaseController = require('./controllers/CaseController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/organizations', OrganizationController.index)
routes.post('/organizations', OrganizationController.create);

routes.get('/cases', CaseController.index)
routes.post('/cases', CaseController.create);
routes.put('/cases/:id', CaseController.update);
routes.delete('/cases/:id', CaseController.delete);

module.exports = routes;