const ApiError = require("../api-error")
const ContactService = require("../services/contact.service")
const MongoDB = require("../utils/mongodb.util")

module.exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name cannot be  empty"))
    }

    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.create(req.body)
        return res.send(document)
    }
    catch (err) {
        return next (
            new ApiError(500, "An error occurred while creating contact")
        )
    }
}

module.exports.findAll = (req, res) => {
    res.send({message: 'find all handler'})
}

module.exports.findOne = (req, res) => {
    res.send({message: 'find one handler'})
}

module.exports.update = (req, res) => {
    res.send({message: 'update handler'})
}

module.exports.delete = (req, res) => {
    res.send({message: 'delete handler'})
}

module.exports.deleteAll = (req, res) => {
    res.send({message: 'deleteAll handler'})
}

module.exports.findAllFavorite = (req, res) => {
    res.send({message: 'findAllFavorite handler'})
}