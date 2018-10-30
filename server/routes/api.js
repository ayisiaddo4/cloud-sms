'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController'),
    PostServiceController = require('../controllers/postServerController'),
    GroupServiceController = require('../controllers/groupServerController'),
    NodeMailController = require('../controllers/nodeMailer'),
    HubtelServiceController = require('../controllers/hubtelServiceController'),
    InfobipSmsServerController = require('../controllers/infobipSms.server.controller'),
    McSmppServerController = require('../controllers/mcsmpp.server.controller'),
    LarvitSmppServerController = require('../controllers/nodesmpp.server.controller'),
    McUSSDSeviceController = require('../controllers/mcussd.service.controller');


var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);

    router.post('/mail', NodeMailController.doPost);
    router.post('/mandmail', NodeMailController.sendMandrillMail);
    router.post('/group', GroupServiceController.createGroup);
    router.post('/post', PostServiceController.postContent);

    router.post('/receivemoney', HubtelServiceController.receiveMoney);
    router.post('/sendmoney', HubtelServiceController.sendMoney);
    router.post('/sendsms', InfobipSmsServerController.doPostSms);
    router.post('/smsdelivery', InfobipSmsServerController.getDeliveryReport);
    router.post('/callback', HubtelServiceController.callBack);
    router.post('/status', HubtelServiceController.geTranStatus);
    router.post('/refund', HubtelServiceController.refund);
    router.post('/ussdclientresponse', McUSSDSeviceController.ussdCallBack);
    router.post('/ussdaccountcheck', McUSSDSeviceController.acCheck);
    router.post('/ussdendpoint', McUSSDSeviceController.registerEndpoint);
    router.post('/sendsmpp', McSmppServerController.sendSMS);
    router.post('/smsreceiver', McSmppServerController.smsCallback);

  // GET Routes.
    router.get('/peoples', AuthController.peoples );
    router.get('/people/:id', AuthController.people );

    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    router.get('/groups', GroupServiceController.getAllGroups);
    router.get('/group/:id', GroupServiceController.getGroup);
    router.put('/group/update/:id', GroupServiceController.updateGroup);
    router.delete('/group/remove/:id', GroupServiceController.removeGroup);

    router.get('/posts', PostServiceController.getAllPosts);
    router.get('/post/:id', PostServiceController.getPost);
    router.put('/post/update/:id', PostServiceController.updatePost);
    router.delete('/post/remove/:id', PostServiceController.removePost);

    router.get('/status', HubtelServiceController.geTranStatus);
    router.get('/callback', HubtelServiceController.callBack);
    router.get('/smsdelivery', InfobipSmsServerController.getDeliveryReport);
    router.get('/ussdcallback', McUSSDSeviceController.ussdCallBack);
    router.get('/ussdclientresponse', McUSSDSeviceController.ussdCallBack);
    // router.get('/smsreceiver', McSmppServerController.smsCallback);
    router.get('/sendsmpp', McSmppServerController.sendSMS);

    // router.get('/smpp', McSmppServerController.doSmpp);
    router.get('/larvitsmpp', LarvitSmppServerController.doLarvitSmpp);
  return router;
};

module.exports = APIRoutes;
