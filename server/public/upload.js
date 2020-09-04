const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mongo = require("./utils/mongoDB")
const {
    sendDate
} = require("./utils/sendDate")
// 配置上传参数
let storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, './uploads/');
    // },

    // 上传文件保存目录，无则自动创建
    destination: path.join(__dirname, '../public/uploads/'),

    // 格式化文件名：字段名+时间戳+扩展名
    // avatar-1597202347355.jpg
    filename: function (req, file, cb) {
        // 获取文件后缀名
        let ext = path.extname(file.originalname);

        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})
// 设置中间件
const uploadMiddleware = multer({
    storage
});

router.post('/avatar', uploadMiddleware.single('haoge'), async (req, res) => {
    // 中间件会把图片信息格式化到req.file,req.files
    // console.log('file=', req.file, req.body);
    // const {
    //     _id
    // } = req.body;

    // 更新用户信息

    const avatarUrl = '/uploads/' + req.file.filename
    try {
        const {
            data
        } = await mongo.insert('img', {
            avatarUrl
        })
        res.send(sendDate({
            code: 1,
            data: avatarUrl
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }

})




module.exports = router;