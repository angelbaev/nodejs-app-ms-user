var url = require('url');
var moment = require('moment');

var UnauthorizedException = require('../../Application/Exception/UnauthorizedException');
var authenticationService = require('../../Application/Service/AuthenticationService');

exports.AuthMiddleware = function (req, res, next) {
    var path = url.parse(req.url).pathname;
    var skipVerify = [''];
    if (path.length > 1) {
        var routeName = path.split('/')[1];

        if (routeName.startsWith('sso')) {
            next();
        } else if (routeName.startsWith('users') && req.method === 'POST') {
            next();
        } else {
            if (req.token === undefined) {
                res.status(403).json({
                    status: "failed",
                    message: UnauthorizedException.getMessage(),
                    data: {}
                });
            } else {
                var now = new Date();
                var currentTime = moment(now);
                authenticationService.findOneByToken(req.token, function (err, token) {
                    if (err) {
                        throw new EntityNotFoundException(EntityNotFoundException.getMessage());
                    }
                    var accessDecoded = false;
                    if (token === undefined) {
                        accessDecoded = true;
                    } else {
                        var expireTime = moment(token.expires);
                        if (currentTime.diff(expireTime, 'minutes') > 0) {
                            accessDecoded = true;
                        }

                    }

                    if (accessDecoded) {
                        res.status(403).json({
                            status: "failed",
                            message: UnauthorizedException.getMessage(),
                            data: {}
                        });
                    } else {
                        next();
                    }
                });
            }
        }
    } else {
        next();
    }
};