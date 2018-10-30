'use strict';
const larvitsmpp = require('larvitsmpp');
const LUtils = require('larvitutils');
const lUtils = new LUtils();
const log = new lUtils.Log('debug');
var   LarvitSmpp = {};

// Step 2: Bind Transceiver
LarvitSmpp.doLarvitSmpp = function(req, res) {
    console.log('call doLarvitSmpp module ...');

    larvitsmpp.client({
        'host': '54.163.215.114', 
        'port': 1817,
        'username': 'CldAfr1',
        'password': 'C1D2A3f4',
        'log': log
    }, function(err, clientSession) {
        if (err) {
            log.log(JSON.stringify(err));
            throw err;
            res.json(err);
        }

        clientSession.sendSms({
            'from': '233244588584',
            'to': '233552492165',
            'message': 'test smpp with larvitsmpp',
            'dlr': true
        }, function(err, smsId, retPduObj) {
            if (err) {
                res.send(err);
            }

            console.log('Return PDU object: ');
            console.log(retPduObj);
            res.status(201).json(retPduObj);
        });

        clientSession.on('dlr', function(dlr, dlrPduObj) {
            console.log('DLR received:');
            console.log(dlr);

            console.log('DLR PDU object:');
            console.log(dlrPduObj);
            res.json(dlrPduObj);
            // Gracefully close connection
            clientSession.unbind();
        });
    });

}

module.exports = LarvitSmpp;