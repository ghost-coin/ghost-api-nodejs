'use strict';

const WalletService = require('./WalletService');

class SmsgService extends WalletService {
    getSmsgInfo() {
        return this.call('smsggetinfo');
    }

    setSmsgWallet(wallet) {
        return new Promise(async (resolve, reject) => {
            await this.setWallet(wallet);

            this.call('smsgsetwallet', [wallet])
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    smsgSend(fromAddress, toAddress, message, paidMessage, daysRetention, estimateFee) {
        const params = [
            fromAddress,
            toAddress,
            JSON.stringify(message),
            paidMessage,
            daysRetention,
            estimateFee
        ];

        return new Promise((resolve, reject) => {
            this.call('smsgsend', params)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    smsgSendAnon(toAddress, message) {
        return new Promise((resolve, reject) => {
            this.call('smsgsendanon', [toAddress, message])
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    smsgList(mode = 'all', filter = '', options = {}) {
        return new Promise((resolve, reject) => {
            this.call('smsginbox', [mode, filter, options])
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    smsgLocalKeys() {
        return new Promise((resolve, reject) => {
            this.call('smsglocalkeys')
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    smsgGet(msgId, remove = false, setRead = true) {
        return new Promise((resolve, reject) => {
            this.call('smsg', [msgId, {
                    delete: remove,
                    setread: setRead,
                    encoding: 'text'
                }])
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    smsgAddAddress(address, publicKey) {
        return new Promise((resolve, reject) => {
            this.call('smsgaddaddress', [address, publicKey])
                .then(response => {
                    if (response.result === 'Public key added to db.' || (response.result === 'Public key not added to db.' && response.reason === 'Public key exists in database')) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    smsgImportPrivKey(privateKey, label = 'default smsg') {
        return new Promise((resolve, reject) => {
            this.call('smsgimportprivkey', [privateKey, label])
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    static sendMessage(message, params) {
        return new Promise((resolve, reject) => {
            this.smsgSend(params.fromAddress, params.toAddress, message, params.paidMessage, params.daysRetention, params.estimateFee)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = SmsgService;