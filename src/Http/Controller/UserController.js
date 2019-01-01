var md5 = require('md5');

var userService = require('../../Application/Service/UserService');
var userTransformer = require('../Transformer/UserTransformer');
var EntityNotFoundException = require('../../Application/Exception/EntityNotFoundException');
var EntitySaveException = require('../../Application/Exception/EntitySaveException');
var EntityDeleteException = require('../../Application/Exception/EntityDeleteException');

exports.index = function (req, res) {
    userService.findAll(function (err, rows) {
        if (err) {
            throw err;
        }
        var users = [];
        rows.forEach((row) => {
            users.push(row);
        });

        var collection = userService.collection(users, users.length);
        res.json({
            status: "success",
            message: "Users retrieved successfully!",
            totalCount: collection.getTotalCount(),
            data: userTransformer.transformCollection(collection)
        });
    });
};

exports.new = function (req, res) {
    var params = req.body;
    var notAllowedParams = userService.checkAllowedParams(params);

    if (notAllowedParams.length > 0) {
        throw Error('Not allowed params: ' + notAllowedParams.join(','));
    }

    if (params.hasOwnProperty('password')) {
        params.password = md5(params.password);
    }

    userService.create(params, function (err) {
        if (err) {
            throw new EntitySaveException(EntitySaveException.getMessage())
        }

        userService.findById(params.id, function (err, user) {
            if (err) {
                throw new EntityNotFoundException(EntityNotFoundException.getMessage());
            }

            res.json({
                status: "success",
                message: "New user created!",
                data: userTransformer.transform(user)
            });
        });
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    var params = req.body;
    var notAllowedParams = userService.checkAllowedParams(params);

    if (notAllowedParams.length > 0) {
        throw Error('Not allowed params: ' + notAllowedParams.join(','));
    }
    if (params.hasOwnProperty('password') && params.password !== '') {
        params.password = md5(params.password);
    }

    userService.update(params, id, function (err) {
        if (err) {
            throw new EntitySaveException(EntitySaveException.getMessage())
        }

        userService.findById(id, function (err, user) {
            if (err) {
                throw new EntityNotFoundException(EntityNotFoundException.getMessage());
            }

            res.json({
                status: "success",
                message: "User info updated!",
                data: userTransformer.transform(user)
            });
        });
    });
};

exports.view = function (req, res) {
    var id = req.params.id;

    userService.findById(id, function (err, user) {
        if (err) {
            throw new EntityNotFoundException(EntityNotFoundException.getMessage());
        }

        res.json({
            status: "success",
            message: "User details!",
            data: userTransformer.transform(user)
        });
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    userService.remove(id, function (err, user) {
        if (err) {
            throw new EntityDeleteException(EntityDeleteException.getMessage());
        }

        res.json({
            status: "success",
            message: "User was removed successfully!",
            data: {}
        });
    });
};