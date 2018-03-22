const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);


// Pick up static file index.html
app.use(express.static(__dirname));
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const dbUrl = require('./config');

const Message = mongoose.model('Message', {
    name: String,
    message: String,
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, mess) => {
        res.send(mess)
    })
});

app.get('/messages/:user', (req, res) => {
    const {user} = req.params

    Message.find({name: user}, (err, mess) => {
        res.send(mess)
    })
});

app.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body);

        await message.save()

        const censoredMessage = await Message.findOne({message: 'badword'})

        if (censoredMessage)
            await Message.remove({_id: censoredMessage.id})
        else
            io.emit('message', req.body);

        console.log('saved')
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        console.log('message post called')
    }

});

io.on('connection', (socket) => {
    console.log('A user connected');
})

mongoose.connect(dbUrl, (err) => {
    console.log('Mongo db connection', err);
})

const server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})

// close down server on CTRL+C
process.on("SIGINT", () => {
    console.log("SIGINT");
    server.close();
    process.exit();
});