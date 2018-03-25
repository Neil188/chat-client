# Chat Client

Demo chat app for LinkedIn course learning NodeJS.

## Installation Instructions

1. Clone locally using:

    `git clone https://github.com/Neil188/chat-client`

2. Install dependencies:

    `npm install`

3. Set up mLab

    Create an mLab account, and set up a Sandbox deployment (the Sandbox plan is free).  Once created, open the deployment and add a database user.
    Once you have these update the config.js with your username and password, the mlabLink should be set to the value displayed under 'To connect using a driver via the standard MongoDB URI'
    (note if you try to use the example config.js it will fail to connect!)

4. Start nodemon monitoring your build

    `npm start`

5. Run jasmine tests

    `npm test`

6. If the above test passed should now be able to connect to the front-end on [localhost port 3000](http://127.0.0.1:3000/).
    If you open two windows to this page and send a message, you should see the message listed on both pages.  And if you close, then reopen the page the messages should persist.

## Technologies used

* npm v5.6.0
* Node v9.8.0
* express v4.16.3
* mongoose v5.0.11
* socket.io v2.0.4
* jasmine v3.1.0
* nodemon v1.17.2
