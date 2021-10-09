const Block = require('./block');

describe('Block', () => {

    let data, lastBlock, blockMined;
    
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

    it('generates a hash that matches the difficulty', () => {
        expect(blockMined.hash.substring(0, blockMined.difficulty)).toEqual('0'.repeat(blockMined.difficulty));    
    });

    it('lowers the difficulty for slowly mined blocks', ()=>{
        expect(Block.adjustDifficulty(blockMined, blockMined.timestamp + '3600000'))
            .toEqual(blockMined.difficulty - 1);
    });

    it('raises the difficulty for quickly mined blocks', ()=>{
        expect(Block.adjustDifficulty(blockMined, blockMined.timestamp + 1))
            .toEqual(blockMined.difficulty + 1);
    });

});