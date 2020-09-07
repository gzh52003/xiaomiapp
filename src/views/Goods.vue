<template>
  <div>
    <van-nav-bar
      :title="data.product_name"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-image :src="data.img_url[0]" @click="showBig" :key="data._id"></van-image>
    <div class="goods-info">
      <h1>{{data.product_name}}</h1>
      <van-tag plain type="primary">{{data.product_brief}}</van-tag>
      <p class="price">
        <del>{{data.product_price}}</del>
        <span>{{data.product_org_price}}</span>
      </p>
    </div>
    <h4>推荐商品</h4>
    <van-grid :border="false" :column-num="3" class="goodslist">
      <van-grid-item v-for="item in recommend" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.img_url[0]" />
        <h4>{{item.product_name}}</h4>
        <p class="price">
          <del>{{item.product_org_price}}</del>
          <span>{{item.product_price}}</span>
        </p>
      </van-grid-item>
    </van-grid>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="goto('/cart')" />
      <!-- :badge="cartlist.length" -->
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="add2cart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from "vue";
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ImagePreview,
  Toast,
} from "vant";

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(ImagePreview);
Vue.use(Toast);

export default {
  name: "Goods",
  data() {
    return {
      data: {
        img_url: [],
      },
      recommend: [],
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
      this.$router.back();
      // console.log("router=", this.$router);
    },
    onClickRight() {
      Toast("按钮");
    },
    goto(path) {
      this.$router.push(path);
    },
    gotoDetail(id) {
      // this.$router.push(`/goods/${id}`)
      // this.$router.push({
      //   name:'Goods',
      //   params:{
      //     id
      //   }
      // })
      this.goto({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    showBig() {
      console.log(this.data.big_img_url);
      ImagePreview({
        images: [
          this.data.img_url,
          "http://localhost:2003/uploads/goods/3b19bf0e7e599c1bbbce510fb0dbc8bc.jpg",
          "http://localhost:2003/uploads/goods/7cfdbce40301133a287e9e57faa37bdf.jpg",
          "http://localhost:2003/uploads/goods/237942bfcaf2bbe82fbe966c2f584d69.jpg",
          // "/img/740ff1324d84482ebaf35947059764f6_big.jpg",
          // "/img/2ce8ca193b8f43c799416cbafc7cb2f4_big.jpg",
          // "/img/21fc681cec49425797abc4e1167f5352_big.jpg",
        ],
        closeable: true,
      });
    },
    async getData(id) {
      // this.goodsRequestSource = this.$request.source;
      // console.log("source=", this.$request.source);
      const { data } = await this.$request.get("/goods/" + id, {
        // cancelToken:this.goodsRequestSource.token
      });
      this.data = data.data;
      // console.log("data=", data);
    },
    async getRecommend() {
      const { data: recommend } = await this.$request.get("/goods/", {
        params: {
          sort: "sales_qty",
          total: 0,
        },
      });
      this.recommend = recommend.data;
      // console.log("recommend=", recommend);
    },
    add2cart() {
      // 添加当前商品到购物车;
      // 判断当前商品是否已经存在购物车中
      // 存在：数量+1
      // 不存在：添加到购物车
      const { _id } = this.data;
      const current = this.cartlist.filter((item) => item._id === _id)[0];
      if (current) {
        this.$store.commit("changeQty", { _id, qty: current.qty + 1 });
      } else {
        const goods = {
          ...this.data,
          qty: 1,
        };
        // 调用mutation方法
        this.$store.commit("add", goods);
      }
    },
    buyNow() {
      // 添加当前商品到购物车，并跳转到购物车页面
      this.add2cart();
      this.$router.push("/cart");
    },
  },
  async created() {
    const { id } = this.$route.params;
    // console.log("$route=", this.$route);

    // const { data } = await this.$request.get("/goods/" + id);
    // this.data = data.data;
    // console.log("data=", data);

    this.getData(id);
    this.getRecommend();
  },
  mounted() {
    // 控制菜单显示
    // this.$parent.showMenu = false;
    // console.log('goods.created',this.$parent.showMenu)
    this.$store.commit("displayTabbar", false);
  },
  destroyed() {
    // this.$parent.showMenu = true;
    this.$store.commit("displayTabbar", true);
    // this.goodsRequestSource.cancel()
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.params.id, from.params.id);
    if (to.params.id !== from.params.id) {
      this.getData(to.params.id);
      this.getRecommend();
    }
    next();
  },
};
</script>
<style lang="scss">
.goods-info {
  padding: 15px;
  h1 {
    font-size: 18px;
  }
}
.goodslist {
  h4 {
    font-size: 14px;
  }
  padding-bottom: 110px;
}
</style>