const config = {
    dbuser: "demouser",
    dbpassword: "user1234",
    mlabLink: "ds213118.mlab.com:13118/learning-node",
}

const dbUrl = `mongodb://${config.dbuser}:${config.dbpassword}@${config.mlabLink}`

module.exports = dbUrl;