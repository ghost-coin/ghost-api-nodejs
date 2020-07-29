'use strict';

const RpcService = require('./RpcService');

class AddressService extends RpcService {
    getAddressBalance(addresses) {
        return new Promise((resolve, reject) => {
            this.call('getaddressbalance', [...addresses])
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    listReceivedByAddress(minconf = 3, includeEmpty = false, includeWatchOnly = false, addressFilter = '') {
        if (addressFilter) {
            return new Promise((resolve, reject) => {
                this.call('listreceivedbyaddress', [minconf, includeEmpty, includeWatchOnly, addressFilter])
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                this.call('listreceivedbyaddress', [minconf, includeEmpty, includeWatchOnly])
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }

    getNewAddress(params = [], smsgAddress = true) {
        return new Promise(async (resolve, reject) => {
            if (smsgAddress) {
                const address = await this.call('getnewaddress', params);

                this.call('smsgaddlocaladdress', [address])
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                this.call('getnewaddress', params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            }
        });
    }

    getNewStealthAddress(params = []) {
        return new Promise((resolve, reject) => {
            this.call('getnewstealthaddress', params)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAddressInfo(address) {
        return new Promise((resolve, reject) => {
            this.call('getaddressinfo', [address])
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = AddressService;