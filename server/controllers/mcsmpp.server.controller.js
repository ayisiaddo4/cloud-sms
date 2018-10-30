'use strict';
var config = require('../config'),
    request = require('request'),
    db = require('../models/database'),
    logger = require("./logger"),
    utils = require("../utils/utils"),
    locallydb = require('locallydb'),
    db = new locallydb('../models'),
    collection = db.collection('monsters'),
    MCHTTPSMS = {};

MCHTTPSMS.sendSMS = function (req, res) {
    // http://54.163.215.114:1817/Receiver?User=CldAfr1&Pass=C1D2A3f4&From=1400&To=233552492165&Text=Check Balance
    var body = req.body,
        to = body.receiver,
        message = body.message,
        url = config.mc.SmsUrl+ "User"+"="+config.mc.SmsUsername + "&"+ "Pass"+"="+config.mc.SmsPassword+ "&"+ "From"+"="+config.mc.shortCode+ "&"+ "To"+"="+to + "&"+ "Text"+"="+message;

    var options = {
        url: url,
        json: true,
        method: "GET"
    };
    console.log("mobile content request options >>>", options);
    logger.info('mobile content request options >>>', JSON.stringify(options));
    request(options, function (error, response, body) {
        if (error) {
            console.log("error", "Error sending sms  >>> ", error);
            logger.info(JSON.stringify(error));
            res.json(error);
        } else {
            console.log("info", "MC Send SMS successfully returned 200 Response body>>");
            console.log('mc http sms response >>>>', body);
            logger.info("'mc http sm response log" + JSON.stringify(body));
            res.status(200).json(body);
        }
    });
} //send sms

MCHTTPSMS.smsCallback = function (req, res) {
    // http://54.163.215.114:1817/Receiver?User=CldAfr1&Pass=C1D2A3f4&From=1400&To=233552492165&Text=CheckBalance
    var body = req.body,
        to = body.sender,
        clientKeyWord = body.text,
        message = `Hi ${to}, Your SMS is Successfully Sent. Kindly wait for response accordingly. Thank you `,
        url = config.mc.SmsUrl + "User" + "=" + config.mc.SmsUsername + "&" + "Pass" + "=" + config.mc.SmsPassword + "&" + "From" + "=" + config.mc.shortCode + "&" + "To" + "=" + to + "&" + "Text" + "=" + message;

    console.log('incoming request from MC >>>', body);
    logger.info('Incoming request from clients device ', body);

    // { sender: '233544336599', text: 'Test', receiver: '1400' }
    var options = {
        url: url,
        json: true,
        method: "GET"
    };
    console.log("mobile content request options >>>", options);
    logger.info('mobile content request options >>>', JSON.stringify(options));
    request(options, function (error, response, body) {
        if (error) {
            console.log("error", "Error sending sms  >>> ", error);
            logger.info('error sending sms >>>',JSON.stringify(error));
            res.json(error);
        } else {
            console.log("info", "MC Send SMS successfully returned 200 Response body>>");
            console.log('mc http sms response >>>>', body);
            logger.info("log successful response from Mobile Content >>> " + JSON.stringify(body));
            res.status(200).json(body);
        }
    });

} //http sms callback


module.exports = MCHTTPSMS;