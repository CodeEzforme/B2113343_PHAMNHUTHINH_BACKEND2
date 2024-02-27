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

module.exports.findAll = async (req, res, next) => {
    let documents = []

    try {
        const contactService = new ContactService(MongoDB.client)
        const { name } = req.query

        if(name) {
            documents = await contactService.findByName(name)
        }
        else {
            documents = await contactService.find({})
        }
    }
    catch (err) {
        return next (
            new ApiError(500, "An error occurred while retrieving the contacts")
        )
    }
    return res.send(documents)
}

module.exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.findById(req.params.id)
        if(!document) {
            return next(
                new ApiError(404, "Contact not found!")
            )
        }
        return res.send(document)
    }
    catch (err) {
        return next (
            new ApiError(500, `Error retrieving contact with id: ${req.params.id}`)
        )
    }
}

module.exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data update cannot be empty"))
    }

    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.update(req.params.id, req.body)

        if(!document){
            return next(new ApiError(404, "Cantact not found"))
        }

        res.send({
            message: "Contact was update successfully",
            updatedDocument: document
        })
    }
    catch (err) {
        return next (
            new ApiError(500, `Error retrieving contact with id: ${req.params.id}`)
        )
    }
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