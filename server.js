const express = require('express');

const app = express();

// Pick up static file index.html
app.use(express.static(__dirname))
const server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})