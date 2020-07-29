'use strict';

const RpcService = require('./RpcService');

class BlockchainService extends RpcService {
    getBlockchainInfo() {
        return this.call('getblockchaininfo');
    }
}

module.exports = BlockchainService;