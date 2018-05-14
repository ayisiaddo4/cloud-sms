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
    auth = "Basic " + new Buffer(config.infoBib.userName + ":" + config.infoBib.password).toString("base64");

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
      logger.log("info", "infobip response >>");
      var result = {};
      result.response = body.responsecode;
      result.body = body.data
      // console.log('result body >>>>', result);
      logger.log('response from infobip >>>>', body);

      res.status(200).json(body);
    }
  });

}
module.exports = smsRestService;
