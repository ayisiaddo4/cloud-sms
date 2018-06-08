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
    SmsRestService = require('../controllers/smsRestService');


var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);

    router.post('/mail', NodeMailController.doPost);
    router.post('/group', GroupServiceController.createGroup);
    router.post('/post', PostServiceController.postContent);

    router.post('/receivemoney', HubtelServiceController.receiveMoney);
    router.post('/sendmoney', HubtelServiceController.sendMoney);
    router.post('/sms', SmsRestService.doPostSms);
    router.post('/callback', HubtelServiceController.callBack);


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

  return router;
};

module.exports = APIRoutes;
