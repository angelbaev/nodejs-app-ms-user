var AbstractBaseRepository = require('./AbstractBaseRepository');

module.exports = class TokenRepository extends AbstractBaseRepository{
    /**
     * @param entity
     */
    constructor(entity) {
        super(entity);
    }

    /**
     * @param token
     * @param callback
     * @returns {*}
     */
    findOneByToken(token, callback) {
        return this.db.get('SELECT * FROM `' + this.getTableName() +'` WHERE token = ? LIMIT 1', [token], callback);
    }
}