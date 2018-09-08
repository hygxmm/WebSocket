module.exports = {
    port: 8888,
    //数据库配置
    database: 'mongodb://localhost:27017/Tease',
    //token 过期时限
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 7,
    //管理员账号
    administrator: 'hygx',
    //密码加密强度
    encryptionStrength: 10,
    //token 加密密匙
    privateKey: 'hygx_cc_dd'
}