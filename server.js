require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');

app.use(cors({
    origin: "*",
    credentials: true,
}));

// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/v1',router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);

})