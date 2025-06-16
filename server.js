const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const bodyParser = require('body-parser')

const createServer = async () => {
    app.use(cors())
    app.use(bodyParser.json())
    app.use(express.static('./public'))

    // routes
    require(`./src/routes/api`)(app);

    // home page
    app.get('/', function(req, res) {
        res.sendFile('./public/templates/index.html', { root: __dirname });
    });

    // error page
    app.get(/(.*)/, function(req, res) {
        res.status(404).sendFile('./public/templates/error.html', { root: __dirname });
    });

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
};

module.exports = {
    createServer,
};