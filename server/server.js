const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require('./db/connection');

// using routes
app.use(require('./routes/route'));
console.log('Applicatin trying to start');
con.then((db) => {
    if (!db) return process.exit(1);

    // listen to http server
    app.listen(PORT, () => {
        console.log(`Server is running on port - ${PORT}`);
    });

    app.on('error', (err) => console.log('Failed to connect http server', err));
}).catch((err) => {
    console.log('Connection failed', err);
});
