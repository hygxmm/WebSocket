const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

module.exports = (ctx) => {
    let req = ctx.req;
    let busboy = new Busboy({headers: req.headers})
    let filePath = path.join(__dirname,'../static/image');
    return new Promise((resolve,reject) => {
        let result = {success: false,message: '文件上传失败'}
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const _filePath = path.join(filePath, filename)
            file.pipe(fs.createWriteStream(_filePath))
            file.on('end', () => {
                result.success = true;
                result.message = '文件上传成功';
                result.url = `http://192.168.0.22:8888/image/${filename}`;
            })
        })
        //解析结束回调
        busboy.on('finish', () => {
            console.log("文件上传成功")
            resolve(result);
        })
        //解析错误回调
        busboy.on('error', (error) => {
            console.log("文件上传出错啦")
            reject(result);
        })
        req.pipe(busboy)
    })
}