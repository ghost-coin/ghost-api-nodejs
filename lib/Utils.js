'use strict';

const RpcService = require('./RpcService');
const SmsgService = require('./SmsgService');

class Utils extends RpcService {
    estimateFee(message, params) {
        const esFee = params.estimateFee;
        params.estimateFee = true; // forcing estimation just in case someone calls this directly with incorrect params
        return new Promise((resolve, reject) => {
            SmsgService.sendMessage(message, params)
                .then(response => {
                    response.estimateFee = esFee;
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = Utils;