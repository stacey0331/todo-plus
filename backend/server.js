const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataRouter = require('./dataRouter');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// db
mongoose.connect('mongodb://127.0.0.1:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// express
app.get('/', (res) => {
  res.send('This is the server');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.use('/api', dataRouter);