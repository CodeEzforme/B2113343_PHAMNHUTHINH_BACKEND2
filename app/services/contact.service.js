const { ObjectId } = require('mongodb')

class contactService {
    constructor(client) {
        this.Contact = client.db().colections('contact')
    }
}

module.exports = contactService