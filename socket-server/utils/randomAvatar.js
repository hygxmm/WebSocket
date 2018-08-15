const config = require('./../server.config.js')
const AvatarCount = 8;
module.exports = () => {
    let number = Math.floor(Math.random() * AvatarCount)
    return `localhost:${config.api_port}/avatar/${number}.png`
}