'use strict';

const RpcService = require('./RpcService');

class NetworkService extends RpcService {
    isNetworkAvailable() {
        return new Promise((resolve) => {
            this.getNetworkInfo()
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    getNetworkInfo() {
        return this.call('getnetworkinfo');
    }
}

module.exports = NetworkService;