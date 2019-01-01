var AbstractEntity = require('../AbstractEntity');

module.exports = class TokenEntity extends AbstractEntity {
    /**
     * @param params
     */
    constructor(params = {}) {
        super(params);

        this.id = null;
        this.user_id = null;
        this.token = null;
        this.expires = null;
        this.created = null;

        Object.assign(this, params);
    }

    tableName() {
        return 'token';
    }
}
