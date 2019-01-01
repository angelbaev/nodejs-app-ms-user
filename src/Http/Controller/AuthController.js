var md5 = require('md5');
var moment = require('moment');

var userService = require('../../Application/Service/UserService');
var authenticationService = require('../../Application/Service/AuthenticationService');
var userTransformer = require('../Transformer/UserTransformer');
var tokenTransformer = require('../Transformer/TokenTransformer');
var EntityNotFoundException = require('../../Application/Exception/EntityNotFoundException');
var EntitySaveException = require('../../Application/Exception/EntitySaveException');
var EntityDeleteException = require('../../Application/Exception/EntityDeleteException');
var UnauthorizedException = require('../../Application/Exception/UnauthorizedException');

exports.authenticate = function (req, res) {
    var params = req.body;
    var statusCode = 200;
    var status = 'success';
    var message = '';
    var data = {};

    if (!params.hasOwnProperty('email') && !params.hasOwnProperty('password')) {
        statusCode = 409;
        status = 'failed';
        message = 'Email and Password fields are required!'
    } else if (!params.hasOwnProperty('email')) {
        statusCode = 409;
        status = 'failed';
        message = 'Email field is required!'
    } else if (!params.hasOwnProperty('password')) {
        statusCode = 409;
        status = 'failed';
        message = 'Password field is required!'
    }

    if (statusCode === 200) {
        userService.findOneBy([{email: params.email}, {password: md5(params.password)}], null, function (err, user) {
            if (err) {
                throw new EntityNotFoundException(EntityNotFoundException.getMessage());
            }
            user = userTransformer.transform(user);

            var date = new Date();
            var wrapped = moment(date);
            var created = wrapped.format('YYYY-MM-DD HH:mm:ss');
            wrapped.add(8, 'hours');
            var expire = wrapped.format('YYYY-MM-DD HH:mm:ss');
            var token =  md5(date.getMilliseconds() + user.id);

            var record = {user_id: user.id, token: token, expires: expire, created: created};
            authenticationService.create(record, function (err) {
                if (err) {
                    throw new EntitySaveException(EntitySaveException.getMessage())
                }

                authenticationService.findById(record.id, function (err, newToken) {
                    if (err) {
                        throw new EntityNotFoundException(EntityNotFoundException.getMessage());
                    }
                    token = tokenTransformer.transform(newToken);
                    token.user = user;
                    res.json({
                        status: "success",
                        message: "New token created!",
                        data: token
                    });
                });
            });
        });


    } else {
        res.status(statusCode).json({
            status: status,
            message: message,
            data: data
        });
    }
};

exports.verify = function (req, res) {
    var params = req.body;

    if (!params.hasOwnProperty('token')) {
        params.token = null;
    }

    authenticationService.findOneByToken(params.token, function (err, token) {
        if (err) {
            throw new EntityNotFoundException(EntityNotFoundException.getMessage());
        }
        var now = new Date();
        var currentTime = moment(now);
        var statusCode = 200;
        var status = 'success';
        var message = 'Token Information!';
        var data = {};

        if (token === undefined) {
            var statusCode = 404;
            var status = 'failed';
            var message = EntityNotFoundException.getMessage();
        } else {
            var expireTime = moment(token.expires);
            var isVerify = true;
            if (currentTime.diff(expireTime, 'minutes') > 0) {
                isVerify = false;
            }

            data = tokenTransformer.transform(token);
            data.verify = isVerify;
        }

        res.status(statusCode).json({
            status:status,
            message: message,
            data: data
        });
    });
};
exports.expire = function (req, res) {
    var params = req.body;

    if (!params.hasOwnProperty('token')) {
        params.token = null;
    }

    authenticationService.findOneByToken(params.token, function (err, token) {
        if (err) {
            throw new EntityNotFoundException(EntityNotFoundException.getMessage());
        }

        if (token === undefined) {
            res.status(404).json({
                status: 'failed',
                message: EntityNotFoundException.getMessage(),
                data: {}
            });
        } else {
            var now = new Date();
            var expireTime = moment(now);
            expireTime.add(-8, 'hours');

            authenticationService.update({'expires': expireTime.format('YYYY-MM-DD HH:mm:ss')}, token.id, function (err) {
                if (err) {
                    throw new EntitySaveException(EntitySaveException.getMessage());
                }
                token.expires = expireTime.format('YYYY-MM-DD HH:mm:ss');

                res.status(200).json({
                    status: 'success',
                    message: 'Token Information!',
                    data: tokenTransformer.transform(token)
                });
            });
        }
    });
};

