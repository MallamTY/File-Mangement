'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUploadRoute = require('./routes/fileUpload')


const port = process.env.PORT || 7000;
const app = express();


require('./database')();

app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', fileUploadRoute)


app.listen(port, () => console.log(`\n Server listening on url http://localhost:${port}`))