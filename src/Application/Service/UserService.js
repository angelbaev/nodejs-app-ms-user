var BaseService = require('./BaseService');
var UserReopsitoryFactory = require('../../Infrastructure/Factory/UserReopsitoryFactory');

class UserService extends BaseService{
    /**
     * @param repository
     */
    constructor(repository) {
        super(repository);
    }
}

module.exports =  new UserService(UserReopsitoryFactory.create());
