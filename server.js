const app = require('./app')
const config = require('./app/config')
const MongoDB = require('./app/utils/mongodb.until')

const startServer = async () => {
    try {
        await MongoDB.connect(config.db.uri)
        console.log('Connected to database(MongoDB)!')

        const PORT = config.app.port
        app.listen(PORT, () => {
            console.log('Server is running on port ${PORT}')
        })
    }
    catch (err) {
        console.log('Cannot connect to database(MongoDB)!', err)
        process.exit()
    }
}

startServer()
