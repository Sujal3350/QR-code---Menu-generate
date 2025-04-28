import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express'
import cron from 'node-cron'
import fetch from 'node-fetch'
import mongoose from 'mongoose'
import config from './config/envConfig.js'
import auth from './routes/auth.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = process.env.PORT || 5000

import cors from 'cors'
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json())

//DB connection
mongoose.connect(config.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout
  })
.then(()=>{
    console.log("mongoDb connected");
})
.catch((err) => {console.log("Connection failed", err)})
import User from './models/User.js'

cron.schedule('*/10 * * * *', async () => {
  try {
    await fetch('https://musafir-4lbu.onrender.com'); // Replace with your actual Render URL
    console.log('Self-ping successful - staying awake!');
  } catch (error) {
    console.error('Self-ping failed:', error);
  }
});

//ROUTES
app.use('/auth' ,auth)
app.listen(port, () => {
    console.log(`APP is listening on PORT: ${port}`);
});