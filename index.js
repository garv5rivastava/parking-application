const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/userRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const path = require('path');

require('dotenv').config();
require('./db');
const PORT = process.env.PORT;

const corsOptions = {
    origin: "http://127.0.0.1:5500",                    
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));




app.get('/', (req, res) => {
    res.json({
        message: 'App is live!'
    })
});

app.use('/users', userRoutes);
app.use('/parkings', parkingRoutes);


app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});