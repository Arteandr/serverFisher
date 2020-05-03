const express = require('express');
const app = express();
const cors = require('cors');

const fishingRoute = require('./routes/fishing');

app.use(express.json());
app.use(cors());


app.use('/api/fishing',fishingRoute);

const port = 3000;
app.listen(port,() => console.log(`Server started on port: ${port}`));