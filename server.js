const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express()

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

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

const listen = (port = 3001) => {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
};

module.exports = {
    app,
    listen,
};