const express = require('express');
const app = express();
const port = 8082;

app.get('/', (req, res) => res.send('254ab53b790f2b3aab80bccb6dbe018a0c6769f3'));
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));