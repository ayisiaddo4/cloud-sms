/**
 * Created by hanso on 6/27/2017.
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  nodemailer = require('nodemailer'),
  async = require('async'),
  logger = require("./logger"),
  smsRestService = {};

// send SMS
smsRestService.doPostSms = function (req, res) {
  var body = req.body,
    url = config.infoBib.baseUrl + config.infoBib.sendSmsUrl,
    auth = "Basic " + new Buffer(body.clientId + ":" + body.clientSecret).toString("base64");

  logger.info('info', 'body request >>');
  logger.info('info', body);

  var payload = {
    "from": req.body.from,
    "to": req.body.to,
    "text": req.body.message
  };

  var options = {
    url: url,
    json: true,
    body: payload,
    method: "POST",
    headers: {
      "Authorization": auth
    }
  };
  console.log("options >>>", options);
  logger.log("postSMS options == "+ options);
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "error sms >>> ", error);
      logger.error("error sms >>> ", error);
      res.json(error);
    } else {
      logger.log("infobip", "successful response >>");
      console.log('result body >>>>', body);
      logger.log('infobip request response body >>>>', body);

      res.status(200).json(body);
    }
  });

}
smsRestService.getDeliveryReport = function (req, res) {
  var body = req.body,
    url = config.infoBib.baseUrl + config.infoBib.getDeliveryReport,
    auth = "Basic " + new Buffer(body.clientId + ":" + body.clientSecret).toString("base64");
    
  var payload = {
    "from": req.body.from,
    "to": req.body.to,
    "text": req.body.message
  };

  var options = {
    url: url,
    json: true,
    body: payload,
    method: "POST",
    headers: {
      "Authorization": auth
    }
  };
  console.log("options >>>", options);
  logger.info("postSMS options == "+ options);

  request(options, function (error, response, body) {
    // console.log('sms', response);
    // logger.info('send sms response >>>>');
    if (error) {
      console.log("error", "error sms >>> ", error);
      logger.error("error sms >>> ", error);
      res.json(error);
    } else {
      console.log("infobip", "successful response --------------");
      logger.info('infobip response body >>>>', JSON.stringify(body));
      res.status(200).json(body);
    }
  });

}

module.exports = smsRestService;
