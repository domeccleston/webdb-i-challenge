const express = require('express');
const accountsRouter = require('./accountsRouter');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

module.exports = server;