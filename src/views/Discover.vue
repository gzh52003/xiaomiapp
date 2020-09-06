<template>
  <div class="app">
    <van-search v-model="value" shape="round" background="#ccc" placeholder="请输入搜索关键词" />

    <van-row>
      <van-col span="6">
        <van-sidebar v-model="activeKey" @change="classification" style="display:inline-block">
          <van-sidebar-item title="手机" />
          <van-sidebar-item title="电脑" />
          <van-sidebar-item title="电视" />
          <van-sidebar-item title="其他" />
        </van-sidebar>
      </van-col>
      <van-col span="18" style="padding-bottom:50px">
        <van-grid :border="false" :column-num="2" class="goodslist">
          <van-grid-item v-for="item in goodslist" :key="item._id" @click="gotoDetail(item._id)">
            <van-image :src="item.img_url[0]" />
            <h4 style="font-size:14px">{{item.product_name}}</h4>
            <p class="price">
              <del>{{item.product_price}}</del>
              <span>{{item.product_org_price}}</span>
            </p>
          </van-grid-item>
        </van-grid>
      </van-col>
      <!-- <van-col span="8">span: 8</van-col> -->
    </van-row>

    <!-- <van-image width="100px" height="100px" fit="cover" src="./img/qy1.jpg" /> -->
  </div>
</template>
<script>
import Vue from "vue";
import { Sidebar, SidebarItem } from "vant";

Vue.use(Sidebar);
Vue.use(SidebarItem);

export default {
  name: "List",
  data() {
    return {
      value: "",
      activeKey: 0,
      goodslist: [],
    };
  },
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
    async classification(index) {
      console.log(index);
      const {
        data: { data: goodslist },
      } = await this.$request.get("/goods", {
        params: {
          total: 0,
          size: 6,
          page: index - 0 + 1,
        },
      });
      this.goodslist = goodslist;
    },
  },
  async created() {
    // 列表数据;
    const {
      data: { data: goodslist },
    } = await this.$request.get("/goods", {
      params: {
        total: 0,
        page: 1,
        size: 6,
      },
    });
    this.goodslist = goodslist;
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
.app {
  height: 100%;
  .left-search {
    height: 100%;
    //   padding-bottom: 2000px;
  }
}
</style>