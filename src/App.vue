<template>
  <div id="app">
    <router-view />
    <!-- <van-button type="primary">Button</van-button> -->
    <van-tabbar v-show="showTabbar" v-model="active" route>
      <van-tabbar-item
        :icon="item.icon"
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
      >{{item.text}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
 <script>
import Vue from "vue";
import {
  Button,
  Tabbar,
  TabbarItem,
  Tag,
  Image,
  ImagePreview,
  Field,
  Icon,
  Checkbox,
  Col,
  Row,
  Cell,
  CellGroup,
  Divider,
  Card,
  SwipeCell,
  Stepper,
  CheckboxGroup,
  SubmitBar,
  Dialog,
} from "vant";
Vue.use(SubmitBar);
Vue.use(Divider);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Image);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
Vue.use(Field);
Vue.use(Checkbox);
Vue.use(ImagePreview);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Card);
Vue.use(SwipeCell);
Vue.use(Stepper);
Vue.use(CheckboxGroup);
Vue.use(Dialog);
export default {
  data() {
    return {
      active: 0,
      showMenu: true,
      menu: [
        {
          name: "home",
          path: "/home",
          icon: "wap-home-o",
          text: "首页",
        },
        {
          name: "discover",
          path: "/discover",
          icon: "eye-o",
          text: "发现",
        },
        {
          name: "cart",
          path: "/cart",
          icon: "shopping-cart-o",
          text: "购物车",
        },
        {
          name: "mine",
          path: "/mine",
          icon: "user-o",
          text: "我的",
        },
      ],
    };
  },
  computed: {
    cartLength() {
      return this.$store.state.cart.goodslist.length;
    },
    showTabbar() {
      return this.$store.state.common.showTabbar;
    },
  },
  // created() {
  //   this.$store.dispatch("getCartAsync");
  // },
};
</script>
<style lang="scss">
.price {
  del {
    color: #999;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    color: #f00;
    &::before {
      content: "￥";
    }
  }
}
</style>
