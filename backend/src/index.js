const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const fs = require('fs');

const app = express();

const config_object = fs.readFileSync('./config.json');
const content_config = JSON.parse(config_object);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(content_config.PORT_BACKEND);