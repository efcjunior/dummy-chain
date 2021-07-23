/*
 *Block is blockchain fundamental unity which store data (transactions) 
 *and some attributes, such: timestamp, last block hash, block hash
 * 
 */

const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
           return `
            Block - 
            Timestamp: ${this.timestamp}
            LastHash: ${this.lastHash.substring(0,10)}
            Hash: ${this.hash.substring(0,10)}
            Data: ${this.data}
        `;
    }

    static genesis() {
        return new this('Genesis Time', '----', '8d969eef6e', []);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = SHA256(`${timestamp}${lastHash}${data}`).toString();
        return new this(timestamp, lastHash, hash, data);
    }
 }

 module.exports =  Block;