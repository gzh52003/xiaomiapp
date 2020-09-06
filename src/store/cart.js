import request from '../utils/request'
import {
    Notify
} from 'vant'

const cart = {
    // 添加命名空间
    // namespaced:true,
    // 共享的数据：类似组件中的data
    state: {
        cartList: [],
    },


    // 定义修改state的事件
    // 调用：this.$store.commit('add')
    getters: {
        totalPrice(state, getters, rootState, rootGetters) {
            // console.log("666", state.cartList);
            const totalPrice = state.cartList.reduce((pre, cur) => {
                //   如果选中了，就加上这个的价格，没有就返回上一项
                return cur.checked ? pre + cur.product_price * cur.num : pre;
            }, 0);
            // console.log(totalPrice)
            return totalPrice
        },
    },
    mutations: {
        //添加商品与移除商品需要连接数据库
        // 数量变化与勾选状态不需要连接，本地数据改变即可
        getCart(state, data) {
            // console.log("data", data)
            state.cartList = data
        },
        // 数量
        numChange(state, opt) {
            // console.log(opt)
            // StaticRange.cartLis
            const {
                id = 0, num
            } = opt
            // console.log(id, num)
            state.cartList = state.cartList.map((item) => {
                if (item._id == id) {
                    item.num = num
                }
                return item
            })
        },
        // 单选
        checkedChange(state, opt) {
            // console.log(val); 
            const {
                id = 0, checked
            } = opt
            state.cartList = state.cartList.map((item) => {

                if (item._id == id) {
                    item.checked = checked
                }
                return item
            })
        },
        // 全选
        checkedChangeAll(state, val) {
            // console.log(val);
            state.cartList = state.cartList.map((item) => {

                item['checked'] = val
                return item
            })
        },
        //删除购物车商品
        remove(state) {
            //删除勾选的商品，item.checked =true 
            state.cartList = state.cartList.filter((item) => !item.checked)
            // 连接数据库 ，把删除的商品移除
        },
        // 清空购物车
        clear(state) {
            state.cartList = []
        }

    },
    actions: {
        async getCartAsync(content) {
            const {
                data: {
                    data
                }
            } = await request.get("/cart", {
                params: {
                    username: 'haoge'
                }
            })
            // console.log(data[0].cartList)
            // data = data[0]
            content.commit("getCart", data[0].cartList)
        },
        // async addCart(content, payload) {
        //     const {data:{data}}=await request.post('/card')
        // }
    }

}

export default cart;