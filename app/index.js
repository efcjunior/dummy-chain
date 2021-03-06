const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');
const express = require('express');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);

app.use(express.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.get('/transactions', (req, res) => {
    res.json(tp.transactions);
});

app.get('/public-key', (req, res) => {
    res.json({publicKey: wallet.publicKey});
});

app.post('/mine', (req, res) => {
    let block = bc.addBlock(req.body.data);
    console.log(block.toString());
    p2pServer.syncChains();
    res.redirect('/blocks');
});

app.post('/transact', (req, res) => {
    const {recipient, amount} = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
});

app.listen(HTTP_PORT, console.log(`APP is listening on HTTP PORT ${HTTP_PORT}`));
p2pServer.listen();