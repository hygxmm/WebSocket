module.exports = {
    //api接口
    api_port: 7777,
    //io接口
    io_port: 8888,
    //数据库配置
    database: 'mongodb://localhost:27017/Tease',
    //token 过期时限
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 30,
    //管理员账号
    administrator: 'hygx'
}