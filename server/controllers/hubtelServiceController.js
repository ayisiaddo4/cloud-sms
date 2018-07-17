/**
 * Created by hanso on 12/6/2017.
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  logger = require("./logger"),
  utils = require("../utils/utils"),
  Momo = {};

//Receive mobile money
Momo.receiveMoney = function (req, res) {
  var body = req.body,
    payload,
    url = config.hubtel.baseUrl + config.hubtel.momoReceiveUrl,
    auth = "Basic " + new Buffer(body.clientId + ":" + body.clientSecret).toString("base64");

  payload = {
    "CustomerName": body.customerName,
    "CustomerMsisdn": body.customerMsisdn,
    "CustomerEmail": body.customerEmail,
    "Channel": body.channel,
    "Amount": body.amount,
    "PrimaryCallbackUrl": body.primaryCallbackUrl,
    "Description": body.description,
    "Token": "",
    "ClientReference": body.clientReference
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
  logger.info('receive money request options >>>', JSON.stringify(options));
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error requesting receive momo >>> ", error);
      logger.error(JSON.stringify(error));
      res.json(error);
    } else {
      console.log("info", "Receive Momo Service Request successfully returned 200 Response body>>");
      var result = {};
      result.response = body.ResponseCode;
      result.body = body.Data;
      console.log('result body >>>>', result);
      logger.info("initial receivemoney callback from Service Provider" + result);
      res.status(200).json(result);
    }
  });

}

Momo.sendMoney = function (req, res) {
  var body = req.body,
    payload,
    url = config.hubtel.baseUrl + config.hubtel.momoSendUrl,
    auth = "Basic " + new Buffer(body.clientId + ":" + body.clientSecret).toString("base64");

  payload = {
    "RecipientName": body.recipientName,
    "RecipientMsisdn": body.recipientMsisdn,
    "CustomerEmail": body.customerEmail,
    "Channel": body.channel,
    "Amount": body.amount,
    "PrimaryCallbackUrl": body.primaryCallbackUrl,
    "SecondaryCallbackUrl": body.secondaryCallbackUrl,
    "Description": body.description,
    "ClientReference": body.clientReference
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
  console.log("send momo options >>>", options);
  logger.info("send money request options >>>>" + JSON.stringify(options));
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error requesting sending momo >>> ", error);
      logger.error("error: true" + "message: " + error);
      res.json(error);
    } else {
      console.log("info", "Send Momo Service Request successfully returned 200 Response body >>");
      var result = {};
      result.response = body.ResponseCode;
      result.body = body.Data;
      console.log('result body >>>>', result);
      logger.info("initial callback from Service Provider" + JSON.stringify(result));
      res.status(200).json(result);
    }
  });

} // send mobile money

Momo.refund = function (req, res) {
  var body = req.body,
    payload,
    url = config.hubtel.baseUrl + config.hubtel.refundUrl,
    auth = "Basic " + new Buffer(body.clientId + ":" + body.clientSecret).toString("base64");

  payload = {
    "TransactionId": body.transactionId,
    "Reason": body.reason,
    "ClientReference": body.clientReference,
    "Description": body.description,
    "Amount": body.amount,
    "Full": body.full
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
  console.log("Refund options >>>", options);
  logger.log("Refund options >>>>" + options);
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error requesting refund >>> ", error);
      logger.error("Error requesting refund :::" +error);
      res.json(error);
    } else {
      console.log("info", "Refund Momo Service Request successfully returned 200 Response body >>> ");
      var result = {};
      result.response = body.ResponseCode;
      result.body = body.Data;
      console.log('result body >>>>', result);
      logger.info("initial callback from Service Provider" + JSON.stringify(result));
      res.status(200).json(result);
    }
  });

} // Refund mobile money


Momo.geTranStatus = function (req, res) {
  // https://api.hubtel.com/v1/merchantaccount/merchants/HM2105180005/transactions/status?networkTransactionId=3629138929&hubtelTransactionId=HUBV9023LASFLAKS8
  var body = req.body,
    invoiceToken = "",
    networkId = body.externalTransactionId,
    hubtelId = body.transactionId,
    url = config.hubtel.baseUrl + config.hubtel.tranStatusUrl + 'networkTransactionId' + '=' + networkId + '&' + 'hubtelTransactionId' + '=' + hubtelId,
    auth = "Basic " + new Buffer(body.clientId + ":" + body.clientSecret).toString("base64");

  console.log('geTranStatus ', body);
  var options = {
    url: url,
    json: true,
    method: "GET",
    headers: {
      "Authorization": auth
    }
  };
  console.log("options >>>", options);
  logger.log("Get transaction status", JSON.stringify(options));
  request(options, function (error, response, body) {
    // console.log(response);
    if (error) {
      console.log("error", "Error requesting momo transaction status >>> ", error);
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

Momo.callBack = function (req, res) {
  var body = req.body;
  console.log('listen to Telco callback within 30secs >>>', body);
  logger.info("30secs final callback from telco :::: "+JSON.stringify(body));
  res.status(201).json(body);
} //Momo callback responses


module.exports = Momo;