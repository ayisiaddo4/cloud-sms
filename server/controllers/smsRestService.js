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
    "text": req.body.text
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
  // GET https://api.infobip.com/sms/1/reports?messageId=ff4804ef-6ab6-4abd-984d-ab3b1387e852

  var body = req.body,
    invoiceToken = "",
    messageId = body.messageId,
    bulkId = body.bulkId,
    limit = body.limit,
    url = config.infoBib.baseUrl + config.infoBib.smsDeliveryReportUrl + 'messageId' + '=' + messageId + '&' + 'bulkId' + '=' + bulkId,
    auth = "Basic " + new Buffer(body.clientId + ":" + body.clientSecret).toString("base64");

  console.log('get sms delivery report ', body);
  var options = {
    url: url,
    json: true,
    method: "GET",
    headers: {
      "Authorization": auth
    }
  };
  console.log("options >>>", options);
  logger.log("Get SMS delivery report", JSON.stringify(options));
  request(options, function (error, response, body) {
    console.log(body);
    if (error) {
      console.log("error", "Error getting sms delivery report>>> ", error);
      logger.error('error get sms delivery report');
      res.status(500).json(error);
    } else {
      var result = {};
      result.response = body.results;
      result.body = body;
      console.log('result body >>>>', result);
      logger.info("initial callback from Service Provider" + JSON.stringify(result));
      res.status(200).json(body);
    }
  });

} //get delivery report

module.exports = smsRestService;
