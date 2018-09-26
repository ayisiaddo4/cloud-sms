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
  
  var body = req.body,
      session_id="",
      type="",
      baseUrl ="http://52.214.1.251/m/index.php/MccUSSDReception/",
      responseUrl ="USSDserviceClientResponse?",
      ussdcode="*244*2#",
      message=`Welcome, Cloud Africa
               1. Check Balance
               2. Check Phone Number
               `,
      phone="233244588584",
      url = baseUrl+responseUrl+"ussd_code"+"="+ussdcode+ "&" +"response_message"+"="+message+ "&" + "phone_number"+"="+phone;

var options = {
  url: url,
  json: true,
  method: "POST"
};
console.log("options >>>", options);
logger.log("Get transaction status", JSON.stringify(options));
request(options, function (error, response, body) {
  // console.log(response);
  if (error) {
    console.log("error", "Error requesting MCUssd transaction status >>> ", error);
    logger.info(error);
    res.status(500).json(error);
  } else {
   
    console.log('ussd response >>>>');
    logger.info("initial callback from Service Provider" + JSON.stringify(body));
    res.status(201).json(body);
  }
});

} //MCUssd callback responses


module.exports = MCUssd;