const express = require("express")
const router = express.Router()
const mongo = require("./utils/mongoDB")

const {
    sendDate
} = require("./utils/sendDate")
const {
    insert,
    update
} = require("./utils/mongoDB")

// 获取用户购物车数据列表
router.get('/', async (req, res) => {
    const {
        username
    } = req.query
    // console.log(username)

    try {
        const data = await mongo.find('cartList', {
            username
        }, {})
        // console.log(data)

        res.send(sendDate({
            data
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }

})

// 删除用户购物车数据
router.delete("/:_id", async (req, res) => {
    const {
        _id
    } = req.params
    try {
        const result = await mongo.remove('cartList', {
            _id
        })
        res.send(sendDate({
            code: 1
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})

// 添加用户购物车数据
router.post('/', async (req, res) => {
    const {

        _id,
        product_name,
        img_url,
        product_price,
        product_brief,
        product_org_price,

    } = req.body
    // 检查 商品 id 是否存在，是则 增加数量，否则存入数据库
    let list = await mongo.find('cartList', {
        // 查询 cartList 中的 _id 属性 =_idr 
        "cartList._id": "5f3f812d0aa5c27443bc190e",

    }, {
        field: {
            cartList: true // 返回 cartList 字段数据
        }
    })
    console.log(list)
    if (list.length >= 1) {
        list = list.map((item => {
            if (item._id == _id) {
                item.num = item + 1
            }
            return
        }))
        mongo.update("cartList", {
            "cartList._id": _id
        }, {
            cartList: list
        })
    }

    try {
        const result = await mongo.insert('cartList', {
            username,
            password,
            role,
            gender
        })
        res.send(sendDate({}))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})

module.exports = router