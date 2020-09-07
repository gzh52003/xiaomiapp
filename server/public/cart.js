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
router.delete("/", async (req, res) => {
    const {
        _ids = []
    } = req.query
    console.log(_ids)
    // 删除  cartList 数组中的某几条，所以用 改数据的方法
    try {
        const result = await mongo.update('cartList', {
            username: 'haoge'
        }, {
            $pull: {
                cartList: {
                    _id: {
                        $in: _ids
                    }

                }
            }
        })
        res.send(sendDate({
            code: 1
        }))
    } catch (err) {
        console.log(err)
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
        "cartList._id": _id,

    }, {
        field: {
            cartList: true, // 返回 cartList 字段数据
            _id: false
        }
    })
    console.log(list[0])
    // 如果 返回 了数据 ，说明商品已存在在购物车
    if (list.length >= 1) {
        res.send(sendDate({
            code: 2 // 返回成功信息，code=2 说明购物车已经在该商品，
        }))
        // list = list[0].cartList.map((item => {

        //     if (item._id == _id) {

        //         item.num = item.num - 0 + 1
        //     }
        //     return item
        // }))
        // try {
        //     const ress = await mongo.update("cartList", {
        //         "cartList._id": _id
        //     }, {
        //         $set: {
        //             cartList: list
        //         }
        //     })
        // } catch (err) {

        // }

    } else {
        try {
            mongo.update("cartList", {
                username: 'haoge'
            }, {

                // $push 方法，添加新的数据进 cartList 数组
                $push: {
                    cartList: {
                        _id,
                        product_name,
                        img_url,
                        product_price,
                        product_brief,
                        product_org_price,
                        num: 1,
                    }
                }
            })
            res.send(sendDate({
                code: 1
            }))
        } catch (err) {

        }

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