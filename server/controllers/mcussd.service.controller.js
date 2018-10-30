/**
 * Created by hanso on 12/6/2017.
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  logger = require("./logger"),
  utils = require("../utils/utils"),
  locallydb = require('locallydb'),
  db = new locallydb('../models'),
  collection = db.collection('monsters'),
  MCUssd = {};

MCUssd.acCheck = function (req, res) {
  var body = req.body,
    ussd_code = body.ussd_code,
    service_token = body.service_token,
    url = config.mc.baseUrl + config.mc.activateAccount + "service_token" + "=" + service_token + "&" + "ussd_code" + "=" + ussd_code;

  var options = {
    url: url,
    json: true,
    method: "POST"
  };
  console.log("mc ussd account check options >>>", options);
  logger.info('Options parametes for MC Account Check >>>', JSON.stringify(options));
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error requesting receive momo >>> ", error);
      logger.info(JSON.stringify(error));
      res.json(error);
    } else {
      console.log("info", "MC USSD Account Check Service Request successfully returned 200 Response body>>");
      console.log('result body >>>>', body);
      logger.info("initial receivemoney callback from Service Provider" + JSON.stringify(body));
      res.status(200).json(body);
    }
  });
} //Check USSD Account Active

MCUssd.registerEndpoint = function (req, res) {
  var body = req.body,
    ussd_code = body.ussd_code,
    service_token = body.service_token,
    endpoint = body.endpoint,
    url = config.mc.baseUrl + config.mc.registerEndpoint + "service_token" + "=" + service_token + "&" + "ussd_code" + "=" + ussd_code + "&" + "endpoint" + "=" + endpoint;

  console.log('register endpont request body' + JSON.stringify(body));
  collection.insert({ussd_code: ussd_code, service_token: service_token, endpoint: endpoint});
  var newendpoint = JSON.stringify(collection.get(0));
  console.log('get collection' +newendpoint);
  var options = {
    url: url,
    json: true,
    method: "POST"
  };
  console.log("mc ussd endpoint options >>>", options);
  logger.info('mc ussd endpoint options >>>', JSON.stringify(options));
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error registering ussd enpoint >>> ", error);
      logger.info(JSON.stringify(error));
      res.json(error);
    } else {
      console.log("info", "MC USSD Register Endpoint Request successfully returned 200 Response body>>");
      console.log('mc ussd endpoint response >>>>', body);
      logger.info("mc ussd endpoint response log" + JSON.stringify(body));
      res.status(200).json(body);
    }
  });
} //Register endpoint

MCUssd.ussdCallBack = function (req, res) {
  var reqBody = req.body;
    console.log('incoming request body << >>>', reqBody);
    
  var session_id = reqBody.session_id,
    type = reqBody.type,
    user_request = reqBody.user_request,
    phone_number = reqBody.phone_number,
    baseUrl = config.mc.baseUrl,
    responseUrl = config.mc.clientResponseUrl,
    ussdcode = config.mc.ussd_code,
    message = config.mc.message,
    clientendpoint,
    url =baseUrl +responseUrl +"ussd_code" +"="+ussdcode+ "&"+"response_message"+"=" +message + "&" +"phone_number"+"="+phone_number;

  console.log("==================================");
  console.log("ussd_code >>>", ussdcode);
  console.log("response_message >>>", message);
  console.log("phone number >>>", phone_number);
  console.log("user request >>>", user_request);
  console.log("Session Id >>>", session_id);
  console.log("mcUrl >>>" + url);
  console.log("==================================");
  clientendpoint = collection.where({endpoint: endpoint});
  console.log('collection retrieve endpoint', clientendpoint);

  var options = {
    url: url,
    json: true,
    method: "POST"
  };
  logger.info("options to post >>>", JSON.stringify(options));
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