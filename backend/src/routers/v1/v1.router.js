const express = require('express');
const authRouter = require('./auth.router');
const aiRouter = require('./ai.router');

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/ai', aiRouter);

module.exports = v1Router;