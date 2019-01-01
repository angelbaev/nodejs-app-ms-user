var TokenEntity = require('../../Domain/Token/TokenEntity');
var TokenRepository = require('../Repository/TokenRepository');

module.exports = class TokenReopsitoryFactory {
    /**
     * @returns {module.TokenRepository|*}
     */
    static create() {
        return new TokenRepository(
            new TokenEntity()
        );
    }
}