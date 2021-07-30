const Block = require('./block');
const Blockchain = require('./index');

describe('Blockchain', ()=> {
    let bc;
    let bc2;
    let data;
    let firstBlock;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
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

    it('validates a valid chain', () => {
        bc.addBlock(data);
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a corruption chain', () => {
        bc2.chain[0].data = 'Im a fake genesis block';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corruption  chain', () => {
        bc2.addBlock(data)
        bc2.chain[1].data = 'I am not a second block';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        bc2.addBlock(data);
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace the chain with one of less than or equal', () => {
        bc.addBlock(data);
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});