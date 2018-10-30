/**
 * Created by hanso on 6/27/2017.
 */

'use strict';
var config = require('../config'),
    request = require('request'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    logger = require("./logger"),
    mailerController = {};

var mandrill = require('mandrill-api/mandrill'),
    mandrill_client = new mandrill.Mandrill('j3BUmepZJBL4QqEKsHwhWA');
   
// send maker post to vasapp
mailerController.doPost = function (req, res) {
    var body = req.body;
    logger.info('info','body request >>');
    logger.info('info', body);

    var mailOptions = {
        from: body.fromAddr,
        to: body.toAddr,
        subject: body.subject,
        html: body.body
    };
    
    logger.info('info: ',mailOptions);
    config.getSmtpTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(JSON.stringify(error));
            logger.info('error: true', 'pushing sending mail >>>',error);
            res.json(error);
        } else {
            logger.info('error: false','successful response', info);
            console.log('response sending mail : ' + info);
            res.status(200).json(info);
        }
    });

}

mailerController.sendMandrillMail = function (req, res) {
    var body = req.body;
    logger.info('info','body request >>');
    logger.info('info', body);

    var mailOptions = {
        from: body.fromAddr,
        to: body.toAddr,
        subject: body.subject,
        html: body.body
    };
    
    logger.info('info: ',mailOptions);
    console.log('sending mandril mail-options >>>>'+ mailOptions);
    config.getMandrilTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            logger.log('error: true', 'pushing mandril mail >>>',JSON.stringify(error));
            res.json(error);
        } else {
            logger.log('error: false','successful response', info);
            console.log('Email sent: ' + info.response);
            res.status(200).json(info);
        }
    });


}

module.exports = mailerController;
