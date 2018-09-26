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
      session_id=req.query.session_id,
      type=req.query.type,
      user_request=req.query.user_request,
      phone=req.query.phone_number,
      baseUrl =config.mc.baseUrl,
      responseUrl =config.mc.clientResponseUrl,
      ussdcode=config.mc.ussd_code,
      message=config.mc.message,
      url = baseUrl+responseUrl+"ussd_code"+"="+ussdcode+"&"+"response_message"+"="+message+"&"+"phone_number"+"="+phone;

console.log('request body >>>',body);

var options = {
  url: url,
  json: true,
  method: "POST"
};
console.log("==================================");
console.log("ussd_code >>>", ussdcode);
console.log("response_message >>>", message);
console.log("phone number >>>", phone);
console.log("user request >>>", user_request);
console.log("Session Id >>>", session_id);
console.log("mcUrl >>>"+url);
console.log("==================================");

logger.info("Get transaction status", JSON.stringify(options));
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
    console.log('response from ussd <<< ',body);
    logger.info("initial callback from Service Provider" + JSON.stringify(body));
    res.status(201).json(body);
  }
});

} //MCUssd callback responses


module.exports = MCUssd;