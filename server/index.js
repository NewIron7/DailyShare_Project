import express from "express";
import loginRoute from './routes/login.js';
import adminRoute from './routes/loginAdmin.js';
import homeRoute from './routes/home.js';
import registerRoute from './routes/register.js';
import shareRoute from './routes/share.js';
import actRoute from './routes/act.js';
import discoverRoute from './routes/discover.js';
import dayRoute from './routes/day.js';
import groupRoute from './routes/group.js';

const app = express();
const port = 3000;

//middlewares
app.use(express.json()); //recevoir et envoyer des json

app.use('/api', loginRoute);
app.use('/api', homeRoute);
app.use('/api', registerRoute);
app.use('/api', adminRoute);
app.use('/api', shareRoute);
app.use('/api', actRoute);
app.use('/api', discoverRoute);
app.use('/api', dayRoute);
app.use('/api', groupRoute);

app.listen(port, () => console.log('API is working !'));