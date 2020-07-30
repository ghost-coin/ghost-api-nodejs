'use strict';

const axios = require('axios');

let RPC_REQUEST_ID = 1;
let activeWallet = process.env.DEFAULT_WALLET ? process.env.DEFAULT_WALLET : 'smsg';

class RpcService {

    constructor() {
        this.DEFAULT_HOSTNAME = 'localhost';
        this.DEFAULT_PORT = 51725;
    }

    getOptions() {
        const auth = {
            'username': process.env.RPC_USER,
            'password': process.env.RPC_PASSWORD,
        };

        const headers = {
            'User-Agent': 'Smsg RPC client',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const rpcOpts = {
            auth,
            headers
        };

        return rpcOpts;
    }

    getUrl() {
        const host = process.env.RPC_HOSTNAME ? process.env.RPC_HOSTNAME : this.DEFAULT_HOSTNAME;
        const port = process.env.RPC_PORT ? process.env.RPC_PORT : this.DEFAULT_PORT;
        const wallet = '/wallet/' + activeWallet;

        return `http://${host}:${port}${wallet}`;
    }

    call(method, params = []) {
        const id = RPC_REQUEST_ID++;
        const postData = JSON.stringify({
            jsonrpc: '2.0',
            method,
            params,
            id
        });

        const url = this.getUrl();
        const options = this.getOptions();

        return new Promise((resolve, reject) => {
            axios.post(url, postData, options)
                .then(response => {
                    if (response.status !== 200) {
                        const message = response.data ? response.data : response.statusText;
                        reject(message);
                    }

                    const jsonRpcResponse = response.data.result;
                    if (jsonRpcResponse === undefined) {
                        reject('No information');
                    }

                    resolve(jsonRpcResponse);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static getActiveWallet() {
        return activeWallet;
    }

    static setActiveWallet(wallet) {
        activeWallet = wallet;
    }
}

module.exports = RpcService;