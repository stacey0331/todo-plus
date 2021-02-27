const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

// db
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// express
app.get('/', (req, res) => {
  res.send('This is the server');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});