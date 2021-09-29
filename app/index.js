const Blockchain = require('../blockchain');
const express = require('express');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();

app.use(express.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.listen(HTTP_PORT, console.log(`APP is listening on HTTP PORT ${HTTP_PORT}`));

app.post('/mine', (req, res) => {
    let block = bc.addBlock(req.body.data);
    console.log(block.toString());
    res.redirect('/blocks');
});