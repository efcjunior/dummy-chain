const Block = require('./block');

console.log(Block.mineBlock(Block.genesis(), 'new second block').toString());