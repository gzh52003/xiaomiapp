<template>
  <div>
    <van-nav-bar title="购物车">
      <template #right>
        <van-button style="border:0;margin-right:20px;color:red;" @click="removeTo">删除商品</van-button>
        <van-icon name="comment-o" color="#a6a6a6" badge="5" size="20" />
      </template>
    </van-nav-bar>
    <van-divider :hairline="false" :style="{ margin:'10px 0 16px', padding: '0' }" />
    <van-swipe-cell class="cart-box" :style="{ margin:'10px 0 150px', padding: '0' }">
      <van-card
        :desc="item.product_brief"
        :key="item._id"
        v-for="item in cartList"
        class="goods-card"
        :origin-price="item.product_org_price != item.product_price ? item.product_org_price : null "
      >
        <template #title>
          <p>{{item.product_name}}</p>
        </template>
        <template #price>
          <p style="color:#f00;font-size:16px">{{item.product_price}}</p>
        </template>
        <template #thumb>
          <div :style="{width:'110px',float:'left' ,lineHeight:'110px'}">
            <!-- 双向绑定 cartList 商品的 checked 属性 ，一开始商品没有这个属性，undefine， 为false
            将点击后，就会 变成 ture,会加入到 商品属性当中-->
            <van-checkbox
              v-model="item.checked"
              :style="{float:'left'}"
              @click="checkedChange({id:item._id,checked:item.checked})"
            ></van-checkbox>
            <img
              :src="item.img_url[0]"
              :style="{display:'indent-block',width:'80px',float:'left'}"
              @click="gotoGoods(item._id)"
            />
          </div>
        </template>
        <template #num>
          <van-stepper
            v-model="item.num"
            integer
            @change="numChange({id:item._id,num:item.num})"
            async-change
          />
        </template>
      </van-card>
    </van-swipe-cell>
    <van-submit-bar :price="totalPrice *100" button-text="提交订单" :style="{bottom:'48px'}">
      <!-- 监听 checkall，把 上面的所有状态改为一样的状态 -->
      <van-checkbox v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { Dialog } from "vant";

Vue.use(Dialog);
export default {
  name: "Cart",
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.dispatch("getCartAsync");
  },
  created() {},
  computed: {
    ...mapState({
      cartList(state) {
        return state.cart.cartList;
      },
    }),

    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    checkAll: {
      get() {
        return this.cartList.every((item) => item.checked);
      },
      set(val) {
        this.checkedChangeAll(val);
      },
    },
  },
  methods: {
    gotoGoods(id) {
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    ...mapMutations({
      numChange: (commit, payload) => {
        commit("numChange", payload);
      },
      checkedChange: (commit, payload) => {
        commit("checkedChange", payload);
      },
      checkedChangeAll: (commit, payload) => {
        commit("checkedChangeAll", payload);
      },
      remove: (commit, payload) => {
        commit("remove", payload);
      },
      clear: (commit, payload) => {
        commit("clear", payload);
      },
    }),
    removeTo() {
      Dialog.confirm({
        title: "移除商品",
        message: "确认将商品移除购物车？",
      })
        .then(async () => {
          const _ids = this.cartList.reduce((pre, cur) => {
            // return item.checked;
            if (cur.checked) {
              pre.push(cur._id);
            }
            return pre;
          }, []);
          // console.log(_ids);
          const { data } = await this.$request.delete("/cart/", {
            params: {
              _ids,
            },
          });
          this.remove();
          console.log(data);
        })
        .catch((err) => {
          // on cancel
          // console.log(rer);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.cart-box::after {
  content: "";
  display: block;
  box-sizing: border-box;
  height: 1px;
  border: 0.5px solid #e5e5e5;
  border-width: 1px 0 0;
}
</style>