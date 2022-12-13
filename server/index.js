import express from "express";
import loginRoute from './routes/auth.js';
import adminRoute from './routes/authAdmin.js';
import homeRoute from './routes/home.js';
import registerRoute from './routes/register.js'
import shareRoute from './routes/share.js'

const app = express();
const port = 3000;

//middlewares
app.use(express.json()); //recevoir et envoyer des json

app.use('/api', loginRoute);
app.use('/api', homeRoute);
app.use('/api', registerRoute);
app.use('/api', adminRoute);
app.use('/api', shareRoute);

app.listen(port, () => console.log('API is working !'));