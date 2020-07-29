'use strict';

const dotenv = require('dotenv');
const BlockchainService = require('./services/BlockchainService');

dotenv.config();

const blockchainService = new BlockchainService();

(async function () {
    const blockchainInfo = await blockchainService.getBlockchainInfo();
    console.log(blockchainInfo);
})();