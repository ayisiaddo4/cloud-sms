/**
 * Created by hanso on 12/6/2017.
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  logger = require("./logger"),
  utils = require("../utils/utils"),
  MCUssd = {};

MCUssd.ussdReceiver = function (req, callback) {
    req.ussdcode = "*244*2",
    req.phone = "233552492165",
    req.message = `Welcome, Cloud Africa, Check
              1. Account Balance.
              2. Phone number
              `;


  this.mcallBack(req, function (error, response, body) {
    // console.log(response);
    if (error) {
      console.log("error", "Error requesting MCUssd transaction status >>> ", error);
      logger.error('error tracking transaction status');
      res.status(500).json(error);
    } else {
      var result = {};
      result.response = body.ResponseCode;
      result.body = body.Data;
      console.log('result body >>>>', result);
      logger.info("initial callback from Service Provider" + JSON.stringify(result));
      res.status(200).json(result);
    }
  });

} //get transaction status

MCUssd.ussdCallBack = function (req, res) {
   var reqBody = req.body;
    // console.log('incoming request body << >>>', reqBody);
  var session_id = reqBody.session_id,
    type = reqBody.type,
    user_request = reqBody.user_request,
    phone_number = reqBody.phone_number,
    baseUrl = config.mc.baseUrl,
    responseUrl = config.mc.clientResponseUrl,
    ussdcode = config.mc.ussd_code,
    message = reqBody.message,
    url =baseUrl +responseUrl +"ussd_code" +"="+ussdcode+ "&"+"response_message"+"=" +message + "&" +"phone_number"+"="+phone_number;

  console.log("==================================");
  console.log("user request >>>", user_request);
  console.log("Session Id >>>", session_id);
  console.log("Type >>>", type);
  console.log("mcUrl >>>" + url);
  console.log("==================================");

  var options = {
    url: url,
    json: true,
    method: "POST"
  };
  logger.info("mc ussd callback options to post >>>", JSON.stringify(options));
  request(options, function (error, response, body) {
    // console.log(response);
    if (error) {
      console.log("error", "Error requesting MCUssd transaction status >>> ", error);
      logger.info(error);
      res.status(500).json(error);
    } else {

      // var durl = body, 
      //     phone_number = durl.substr(18,25);
      // console.log('phone from query string >>>>',phone_number);
      console.log('MC USSD gateway response >>> ', body);
      logger.info("MC USSD client response message >>>" + JSON.stringify(body));
      res.status(200).json(body);
    }
  });
} //MCUssd callback responses


module.exports = MCUssd;