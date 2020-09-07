const express = require("express")
const router = express.Router()
const cryto = require("crypto")
const {
    formatData
} = require("../utils/tools")
const mongo = require("../utils/mongo")
//注册
router.post("/", async (req, res) => {
    console.log("注册进入");
    let {
        username,
        password
    } = req.body
    // //这是加密的代码
    const hash = cryto.createHash("md5")
    // // //加盐
    hash.update(password + "liaomi")
    password = hash.digest("hex")
    let result
    try {
        result = await mongo.insert("userList", {
            username,
            password
        })
        console.log("result", result);
        res.send(formatData({
            code: 1
        }))
    } catch (err) {
        res.send(formatData({
            code: 0
        }))
    }
})

//查重
router.get('/check',async (req,res)=>{
    const {username} = req.query;

    const result = await mongo.find('userList',{username});
    if(result.length>0){
        res.send(formatData({code:0}))
    }else{
        res.send(formatData())
    }
})

module.exports = router