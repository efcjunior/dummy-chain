const Block = require('./block');
const Blockchain = require('./blockchain');

describe('Blockchain', ()=> {
    let bc;
    let data;
    let firstBlock;

    beforeEach(() => {
        bc = new Blockchain();
        data = 'add second block';
        firstBlock = Block.genesis()
    });

    it('starts with Genesis block', () => {
        expect(bc.chain[0]).toEqual(firstBlock);
    });

    it('adds a new block', () => {
        let lastHash = bc.addBlock(data).lastHash;
        expect(lastHash).toEqual(bc.chain[0].hash);
    });


});