const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server side.' });
});

app.post('/', (req, res) => {
  res.status(200).json({ message: 'Post to this endpoint.' });
});

app.get('/api/v1/tours', (req, res)=>{

})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});