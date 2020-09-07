<template>
  <div class="home">
    <!-- <van-nav-bar
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>-->
    <van-row>
      <van-col span="4">
        <van-grid>
          <van-grid-item class="headericon" icon="wap-home-o" />
        </van-grid>
      </van-col>
      <van-col span="14">
        <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />
      </van-col>
      <van-col span="6">
        <van-grid>
          <van-grid-item class="headericon" icon="shopping-cart-o" />
          <van-grid-item class="headericon" icon="user-o" />
        </van-grid>
      </van-col>
    </van-row>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in recommend" :key="item._id">
        <img v-lazy="item.img_url[0]" />
        <!-- 将v-lazy指令的值设置为你需要懒加载的图片 -->
      </van-swipe-item>
    </van-swipe>

    <!-- 商品列表 -->
    <van-grid :border="false" :column-num="2" class="goodslist">
      <van-grid-item v-for="item in goodslist" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.img_url[0]" />
        <h4>{{item.product_name}}</h4>
        <p class="price">
          <del>{{item.product_price}}</del>
          <span>{{item.product_org_price}}</span>
        </p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Image,
  Toast,
  NavBar,
  Search,
  Col,
  Row,
} from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);

export default {
  name: "Home",
  data() {
    return {
      recommend: [],
      goodslist: [],
      value: "",
    };
  },
  components: {},
  methods: {
    gotoDetail(id) {
      //this.$router.push(`/goods/${id}`)
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    // onClickLeft() {
    //   Toast("返回");
    // },
    // onClickRight() {
    //   Toast("按钮");
    // },
    // onSearch(val) {
    //   Toast(val);
    // },
    // onCancel() {
    //   Toast("取消");
    // },
  },

  async created() {
    //轮播图数据
    //recommend === data.data

    const {
      data: { data: recommend },
    } = await this.$request.get("/goods", {
      params: {
        size: 5,
        sort: "product_price",
        total: 0,
      },
    });
    this.recommend = recommend;
    // console.log("tt", recommend);

    // 列表数据
    const {
      data: { data: goodslist },
    } = await this.$request.get("/goods", {
      params: {
        total: 0,
      },
    });
    this.goodslist = goodslist;
  },
};
</script>
<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 1000px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  height: 100%;
}
.goodslist {
  padding-bottom: 80px;
  img {
    // vertical-align: top;
    display: block;
  }
  h4 {
    margin-bottom: 0;
    font-size: 14px;
  }
}

.headericon {
  icon {
    font-size: 10px;
  }
}
// .van-gird-item-content {
//   padding: 13px 8px;
// }

// .van-hairline::after {
//   border: none;
// }
</style>