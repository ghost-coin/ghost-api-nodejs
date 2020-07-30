'use strict';

const _ = require('lodash');
const RpcService = require('./RpcService');

class WalletService extends RpcService {
    hasWallets() {
        return new Promise((resolve, reject) => {
            this.getWalletInfo()
                .then(response => {
                    resolve(response.hdseedid !== undefined);
                })
                .catch(() => {
                    reject(false);
                });
        });
    }

    setWallet(wallet) {
        return new Promise(async (resolve, reject) => {
            RpcService.setActiveWallet(wallet);

            const walletLoaded = await this.isWalletLoaded(wallet);
            if (!walletLoaded) {
                this.loadWallet(wallet)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                resolve({});
            }
        });
    }

    isWalletLoaded(name) {
        return new Promise((resolve, reject) => {
            this.listWallets()
                .then(wallets => {
                    const loaded = _.includes(wallets, name);
                    resolve(loaded);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    doesWalletExist(name) {
        return new Promise((resolve, reject) => {
            this.listWalletDir()
                .then(result => {
                    const found = _.find(result.wallets, wallet => {
                        return wallet.name === name;
                    });

                    const exits = found ? true : false;
                    resolve(exits);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    createWallet(name, disablePrivateKeys = false, blank = false) {
        return this.call('createwallet', [name, disablePrivateKeys, blank]);
    }

    loadWallet(name) {
        return this.call('loadwallet', [name]);
    }

    listWallets() {
        return this.call('listwallets');
    }

    listWalletDir() {
        return this.call('listwalletdir');
    }

    getWalletInfo() {
        return this.call('getwalletinfo');
    }
}

module.exports = WalletService;