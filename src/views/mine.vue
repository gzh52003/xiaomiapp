<template>
  <div>
    <van-row
      type="flex"
      justify="space-around"
      align="center"
      style="background:#e26a3c;height:8rem;"
    >
      <van-col span="10" @click="toLogin">
        <van-row type="flex">
          <van-image round width="3.5rem" height="3.5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="username">
            <h2>未登录</h2>
            <p>点击登录</p>
          </div>
        </van-row>
      </van-col>

      <van-col span="10" style="text-align:right; align-self:flex-start;  margin-top:1rem">
        <van-icon name="comment-o" color="#fff" badge="5" size="20" />
      </van-col>
    </van-row>

    <van-cell title="我的订单" is-link value="全部订单" value-class="value-class" />
    <van-divider :hairline="false" :style="{ margin:'10px 0 16px', padding: '0' }" />
    <van-row
      type="flex"
      justify="space-between"
      class="order-state"
      :style="{paddingBottom:'16px'}"
    >
      <van-col span="6">
        <van-icon name="paid" size="24" color="#999999" />
        <p>待付款</p>
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" size="24" color="#999999" badge="5" />
        <p>待收货</p>
      </van-col>
      <van-col span="6">
        <van-icon name="chat-o" size="24" color="#999999" badge="9" />
        <p>待评价</p>
      </van-col>
      <van-col span="6">
        <van-icon name="refund-o" size="24" color="#999999" />
        <p>退款/售后</p>
      </van-col>
    </van-row>
    <!-- <van-divider :hairline="false" :style="{ margin:'10px 0 16px', padding: '0' }" /> -->
    <van-image width="100%" height="90" src="./img/img1.png" />
    <van-cell-group>
      <van-cell title="优惠券" icon="bill" is-link />
      <van-cell title="会员福利" icon="point-gift" is-link />
      <van-cell title="我的钱包" icon="card" is-link />
      <van-cell title="服务中心" icon="bill" is-link />
      <van-cell title="小米之家" icon="point-gift" is-link />
      <van-cell title="更多功能" icon="card" is-link />
      <van-cell title="设置" icon="setting" is-link />
      <van-cell title="设置" icon="setting" is-link />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: "mine",
  methods: {
    toLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style lang="scss" scoped>
body,
ol,
ul,
h1,
h2,
h3,
h4,
h5,
h6,
p,
dl,
dd,
dt,
form,
fieldset,
legend,
input,
figure,
input,
button {
  margin: 0;
  padding: 0;
}
.username {
  margin: 40px;
  h2 {
    font-size: 14px;
    color: #fff;
    line-height: 1.5rem;
  }
  p {
    font-size: 12px;
    line-height: 1.5rem;
    color: #ccc;
  }
}
.value-class {
  font-size: 12px;
}
.order-state {
  text-align: center;
  p {
    font-size: 11px;
    color: #6e6e6e;
  }
}
</style>