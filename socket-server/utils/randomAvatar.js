const config = require('./../server.config.js')
const AvatarCount = 8;
module.exports = () => {
    let number = Math.floor(Math.random() * AvatarCount)
    return `http://localhost:${config.port}/avatar/${number}.png`
}