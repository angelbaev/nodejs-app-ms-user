var AbstractBaseRepository = require('./AbstractBaseRepository');

module.exports = class UserRepository extends AbstractBaseRepository{
    /**
     * @param entity
     */
    constructor(entity) {
        super(entity);
    }
}