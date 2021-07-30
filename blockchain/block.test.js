const Block = require('./block');

describe('Block', () => {

    let data;
    let lastBlock;
    let blockMined;
    
    beforeEach(() => {
        data = 'dummy';
        lastBlock = Block.genesis();
        blockMined = Block.mineBlock(lastBlock, data);
    });

    it('set the `data` to match the input', () => {
        expect(blockMined.data).toEqual(data);
    });

    it('set the `lastHash` to match the hash of the last block', () => {
        expect(blockMined.lastHash).toEqual(lastBlock.hash);
    });

});