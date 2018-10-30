// Application configuration.
'use strict';
var nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
  mandrillTransport = require('nodemailer-mandrill-transport'),

  config = module.exports;


config.db = {
  user: 'areash5_hanson',
  password: 'digimas14',
  name: 'areash5_demo-intr'
};

config.db.details = {
  host: '172.81.119.95',
  port: 3306,
  dialect: 'mysql'
};

//
// config.db = {
//     user: 'root',
//     password: 'digimas14',
//     name: 'sas18_intranet'
// };
//
// config.db.details = {
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql',
//     operatorsAliases: false
// };

config.db.production = {
  url: 'postgres://kmjeplse:YD8y25wAiRzmhZlN7eOSTZFpYWnISFOu@horton.elephantsql.com:5432/kmjeplse',
  dialect: 'postgres'
};

config.keys = {
  secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

config.services = {
  url: "http://172.16.30.8:7777/vasApp/webapi/vas/pay",
  apiId: "payoutlet",
  apiSecret: "2di76uGJPyZ46RA6g4S4zvstlXNjtq1azw3aj5bjVyLkjaHqiZS9ve5KuRrldKLr"
}

var userRoles = config.userRoles = {
  guest: 1, // ...001
  user: 2, // ...010
  admin: 4 // ...100
};

config.accessLevels = {
  guest: userRoles.guest | userRoles.user | userRoles.admin, // ...111
  user: userRoles.user | userRoles.admin, // ...110
  admin: userRoles.admin // ...100
};

config.transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: false,
  auth: {
    user: 'cloud.africagh@gmail.com',
    pass: 'cloud@123'
  }
});

config.getSmtpTransporter = nodemailer.createTransport(smtpTransport({
  host: 'he16.globalhost.co.za',
  port: 25,
  auth: {
    user: 'sasim@sasghana.com',
    pass: 'S@SIm*246'
  },
  tls: {rejectUnauthorized: false},
  debug: true
}));

config.getMandrilTransporter = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: 'j3BUmepZJBL4QqEKsHwhWA'
  }
}));

config.hubtel = {
  baseUrl: "https://api.hubtel.com/v1/merchantaccount",
  merchantId: "HM2105180005",
  momoReceiveUrl: "/merchants/HM2105180005/receive/mobilemoney",
  momoSendUrl: "/merchants/HM2105180005/send/mobilemoney",
  tranStatusUrl: "/merchants/HM2105180005/transactions/status?",
  refundUrl: "/merchants/HM2105180005/transactions/refund"
}

config.infoBib = {
  baseUrl: "https://api.infobip.com/",
  userName: "DafabetGH",
  password: "D@f@Bet*SaS",
  sendSmsUrl: "sms/1/text/single",
  smsDeliveryReportUrl: "sms/1/reports?",
  smsLogsUrl: "sms/1/logs"
}

config.mc = {
  baseUrl: "http://52.214.1.251/m/index.php/MccUSSDReception/",
  clientResponseUrl: "USSDserviceClientResponse?",
  registerEndpoint: "USSDserviceClientRegisterEndpoint?",
  activateAccount: "USSDserviceClientAccountCheck?",
  ussd_code: "*244*2",
  service_token: "mc-ussd-user-token-594ffd4f111cg",
  message: `Welcome to Cloud Africa
  1) Services 
  0) Help
  `,
  SmsUrl: "http://54.163.215.114:1817/Receiver?",
  SmsUsername: "CldAfr1",
  SmsPassword: "C1D2A3f4",
  shortCode: "1400"
}