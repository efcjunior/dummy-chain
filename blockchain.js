const Block = require('./block');

class Blockchain {

    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {    
        let block  = Block.mineBlock(this.chain[this.chain.length - 1], data);    
        this.chain.push(block);
        return block;
    }
}

module.exports = Blockchain;