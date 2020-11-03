const express = require('express');
const { connect } = require('mongoose');
const cookieParser = require('cookie-parser');

const { listen } = require('./global/functions');
const rootRouter = require('./routes/root');

const app = express();
const dburi = 'mongodb+srv://saqib:4UQ79Qslvw82FD6u@homenet.mfa97.mongodb.net/home-net';
connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => listen(app))
  .catch(console.log);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(rootRouter);
