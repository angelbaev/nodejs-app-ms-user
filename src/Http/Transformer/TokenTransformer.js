var Transformer = require('../../Infrastructure/Service/Transformer');
var TokenEntity = require('../../Domain/Token/TokenEntity');

class TokenTransformer extends Transformer{
    /**
     * @param token
     * @param includes
     * @returns @returns {{id: null, token: null, expires: null, created: null}}
     */
    transform(token, includes = []) {
        var token = new TokenEntity(token);

        return {
            id: token.id,
            token: token.token,
            expires: token.expires,
            created: token.created
        }
    }

    /**
     * @param collection
     * @param includes
     * @returns {Array}
     */
    transformCollection(collection, includes = []) {
        var resource = collection.getValues();
        var items = [];

        resource.forEach((row) => {
            items.push(
                this.transform(row)
            );
        });

        return items;
    }
}

module.exports =  new TokenTransformer();
