const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);


// Pick up static file index.html
app.use(express.static(__dirname));
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'},
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('A user connected');
})

const server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})

// close down server on CTRL+C
process.on("SIGINT", () => {
    console.log("SIGINT");
    server.close();
});