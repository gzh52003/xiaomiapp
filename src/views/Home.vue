<template>
  <div class="home">
    <!-- <van-nav-bar
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>-->
    <van-row class="homenav">
      <van-col class="homenav-l" span="4">
        <van-icon name="wap-home-o" size="27" />
      </van-col>
      <van-col span="14">
        <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />
      </van-col>
      <van-col class="homenav-r" span="6">
        <van-icon class="shop" name="shopping-cart-o" size="27" @click="gotoCart" />
        <van-icon class="sm" name="scan" size="27" style />
      </van-col>
    </van-row>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000">
      <!-- <van-swipe-item v-for="item in recommend" :key="item._id">
        <img v-lazy="item.img_url[0]" />
      </van-swipe-item>-->
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
        <!-- 将v-lazy指令的值设置为你需要懒加载的图片 -->
      </van-swipe-item>
    </van-swipe>

    <!-- 商品分类选项卡 -->
    <van-tabs v-model="active" swipeable @click="add">
      <van-tab v-for="(item) in Tabname" :title="item.text " :key="item.id">
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
      </van-tab>
    </van-tabs>

    <!-- 爆卖商品区 -->
    <div class="hotsale">
      <h2>热卖爆品，火热感恩</h2>
      <span>千元全面屏现货抢</span>

      <!-- 两端对齐->  -->
      <van-row type="flex" justify="space-around" class="hotsale-itemall">
        <van-col span="9" class="hotsale-item">
          <div class="hotsale-itemimg">
            <van-image width="100%" height="100%" fit="cover" src="./img/qy1.jpg" />
          </div>
          <div class="hotsale-title">
            <h2>红米5 Plus</h2>
            <span>千元全面屏，前置柔光自拍</span>
            <p>
              ￥999
              <i>起</i>
            </p>
            <van-button type="danger" size="mini">立即购买</van-button>
          </div>
        </van-col>
        <van-col span="9" class="hotsale-item">
          <div class="hotsale-itemimg">
            <van-image width="100%" height="100%" fit="cover" src="./img/qy2.jpg" />
          </div>
          <div class="hotsale-title">
            <h2>红米5</h2>
            <span>千元全面屏，前置柔光自拍</span>
            <p>
              ￥799
              <i>起</i>
            </p>
            <van-button type="danger" size="mini">立即购买</van-button>
          </div>
        </van-col>
      </van-row>

      <van-grid :border="false" :column-num="1" class="hotsale-itemone">
        <van-grid-item
          class="itemone"
          v-for="item in goodsone"
          :key="item._id"
          @click="gotoDetail(item._id)"
        >
          <div class="itemoneimg">
            <van-image :src="item.img_url[0]" />
          </div>
          <h4>{{item.product_name}}</h4>
          <p class="price">
            <!-- <del>{{item.product_price}}</del> -->
            <span>{{item.product_org_price}}</span>
          </p>
          <van-button type="danger" size="small">立即购买</van-button>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 旗舰手机感恩特惠 -->
    <div class="hotsale-ge">
      <h2>旗舰手机感恩特惠</h2>
      <span>多款手机享花呗6期 / 小米分期12期免息</span>

      <van-grid :border="false" :column-num="2" class="hotsale-itemtwo">
        <van-grid-item
          class="itemone"
          v-for="item in goodstwo"
          :key="item._id"
          @click="gotoDetail(item._id)"
        >
          <div class="itemoneimg">
            <van-image :src="item.img_url[0]" />
          </div>
          <h4>{{item.product_name}}</h4>
          <van-tag plain type="primary">{{item.product_brief}}</van-tag>
          <p class="price">
            <!-- <del>{{item.product_price}}</del> -->
            <span>{{item.product_org_price}}</span>
          </p>
          <van-button type="danger" size="small">立即购买</van-button>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- footer -->
    <div class="footer">
      <van-image width="100%" height="100%" fit="cover" src="img/SNH48.png" />
    </div>
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
  Icon,
  Tab,
  Tabs,
  Button,
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
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Button);

export default {
  name: "Home",
  data() {
    return {
      recommend: [],
      goodslist: [],
      goodsone: [],
      goodstwo: [],
      value: "",
      active: "home",
      images: [
        "./img/mi_banner1.jpg",
        "./img/mi_banner2.jpeg",
        "./img/mi_banner3.jpg",
        "./img/mi_banner4.jpg",
        "./img/mi_banner5.jpg",
        "./img/mi_banner6.jpg",
      ],
      Tabname: [
        {
          id: 1,
          text: "推荐",
        },
        {
          id: 2,
          text: "手机",
        },
        {
          id: 3,
          text: "电视",
        },
        {
          id: 4,
          text: "电脑",
        },
      ],
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
    gotoCart() {
      this.$router.push({
        name: "Cart",
      });
    },
    async add(name, title) {
      console.log(name);
      const {
        data: { data: goodslist },
      } = await this.$request.get("/goods", {
        params: {
          total: 0,
          size: 6,
          page: name - 0 + 1,
        },
      });
      this.goodslist = goodslist;
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
    console.log("tt", recommend);

    // 列表数据
    const {
      data: { data: goodslist },
    } = await this.$request.get("/goods", {
      params: {
        total: 0,
        page: 2,
        size: 10,
      },
    });
    this.goodslist = goodslist;

    //千元热销数据
    const {
      data: { data: goodsone },
    } = await this.$request.get("/goods", {
      params: {
        size: 1,
        page: 2,
      },
    });
    this.goodsone = goodsone;
    console.log(this.goodsone);

    //千元热销数据
    const {
      data: { data: goodstwo },
    } = await this.$request.get("/goods", {
      params: {
        size: 4,
        page: 1,
      },
    });
    this.goodstwo = goodstwo;
    console.log(this.goodstwo);
  },
};
</script>
<style lang="scss" scoped >
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 1000px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.goodslist {
  // padding-bottom: 80px;
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

.homenav-l {
  .van-icon {
    margin-top: 85px;
    margin-left: 100px;
  }
}

.homenav-r {
  .van-icon {
    margin-top: 85px;
    margin-left: 80px;
  }
}

.hotsale {
  background: rgba(255, 190, 82, 100);
  text-align: center;
  // height: 1000px;
  overflow: hidden;
  // padding-bottom: 180px;

  h2 {
    color: #7e4d1d;
    font-size: 16px;
    margin-top: 100px;
  }
  span {
    color: #94612f;
    font-size: 12px;
    margin-top: 15px;
  }

  .hotsale-itemall {
    margin-top: 150px;
    .hotsale-item {
      width: 1510px;
      height: 2250px;
      background: #fff;

      .hotsale-itemimg {
        width: 1210px;
        height: 1120px;
      }

      .hotsale-title {
        width: 1210px;
        height: 1130px;
        text-align: center;

        & > h2 {
          font-size: 114px;
          font-weight: bold;
          // margin-top: 100px;
          // line-height: 114px;
        }
        & > span {
          font-size: 10px;
        }
        p {
          color: #f5574e;
          font-size: 18px;
          // line-height: 18px;
          margin-bottom: 130px;
          i {
            font-style: normal;
            font-size: 7px;
          }
        }
        .van-button {
          span {
            font-size: 70px;
            color: #fff;
          }
        }
      }
    }
  }
  .hotsale-itemone {
    // padding-bottom: 80px;
    .itemone {
      .itemoneimg {
        width: 2000px;
        height: 1800px;
        .van-image {
          // vertical-align: top;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    h4 {
      margin-bottom: 0;
      font-size: 14px;
    }
    p {
      span {
        color: red;
      }
    }
    .van-button {
      span {
        font-size: 70px;
        color: #fff;
      }
    }
  }
}

.hotsale-ge {
  background: pink;
  text-align: center;
  overflow: hidden;
  // padding-bottom: 200px;

  .hotsale-itemtwo {
    margin-top: 150px;
  }

  h2 {
    color: #000;
    font-size: 50px;
    margin-top: 100px;
  }
  span {
    color: #94612f;
    font-size: 24px;
    margin-top: 15px;
  }

  .van-button {
    span {
      font-size: 70px;
      color: #fff;
    }
  }
}

.footer {
  height: 2000px;
  padding-bottom: 200px;
}
</style>