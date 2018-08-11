const AvatarCount = 8;

module.exports = () => {
    const number = Math.floor(Math.random() * AvatarCount)
    return `localhost:8888/avatar/${number}.png`
}