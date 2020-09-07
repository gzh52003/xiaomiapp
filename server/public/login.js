const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const token = require('../utils/token')
const {
    formatData
} = require('../utils/tools');
const mongo = require('../public/utils/mongoDB')

//登录
router.get("/", async (req, res) => {
    let {
        username,
        password,
        checked,
        vcode
    } = req.query
    //如果这个验证码不相等
    if (vcode !== req.session.vcode) {
        res.send(formatData({
            code: 10
        }))
        return
    }
    // const hash = crypto.createHash('md5');
    // hash.update(password + 'xiaomi'); //加盐，盐值
    // password = hash.digest('hex');
    //验证用户名是否存在
    let result = await mongo.find("userList", {
        username,
        password
    })
    // console.log("这是一个长度", result.length);
    if (result.length > 0) {
        // 用户名、密码、验证码都校验通过后，判断是否有免登陆选项
        console.log('37req.query=', req.query);
        let authorization;
        if (checked == 'true') {
            // token的操作
            // 1. 生成token
            // const token = jwt.sign({ username }, 'laoxie' ,{
            //     // token有效期
            //     expiresIn: 20//1000 * 60 * 60 * 24 * 7
            // });

            authorization = token.create({
                username
            }, 30)
            console.log("token寿命=", authorization);
        } else {
            authorization = token.create({
                username
            })
        }
        // console.log('token=', authorization);
        result = result[0];
        result.authorization = authorization
        res.send(formatData({
            data: result
        }));
    } else {
        res.send(formatData({
            code: 0
        }))
    }
})
module.exports = router