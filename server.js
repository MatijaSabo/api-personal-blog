const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const bodyParser = require('body-parser')

const createServer = async () => {
    app.use(cors())
    app.use(bodyParser.json())

    // routes
    require(`./src/routes/api`)(app);

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
};

module.exports = {
    createServer,
};