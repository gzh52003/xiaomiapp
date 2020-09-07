<template>
  <div>
    <van-nav-bar title="会员登录" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-form validate-first :model="ruleForm" ref="ruleForm">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        prop="username"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        prop="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="submitForm">登录</van-button>
      </div>

      <p class="mi_register" @click="onClickReg">会员注册</p>
    </van-form>
  </div>
</template>

<style lang="scss">
.mi_register {
  margin: 0;
  padding: 0;
  position: absolute;
  // bottom:100;
  right: 2rem;
}
</style>


<script>
import Vue from "vue";
import { NavBar, Form, Toast } from "vant";

Vue.use(Form);
Vue.use(NavBar);
Vue.use(Toast);

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    // 点击登录触发
    async submitForm() {
      // 点击获取用户输入信息 然后发送请求
      if (this.ruleForm.username && this.ruleForm.password) {
        const { data } = await this.$request.get("/login", {
          params: {
            ...this.ruleForm,
          },
        });
        // console.log("75", data);
        if (data.code === 1) {
          // 登录成功
          Toast.success("登录成功");
          //把用户信息存入本地存储localStorage
          localStorage.setItem("userInfo", JSON.stringify(data.data));
          // 登录成功后跳转 到 首页
          const { redirectTo = "/home" } = this.$route.query;
          // console.log("redirectTo=", redirectTo);
          this.$router.replace(redirectTo);
        } else {
          Toast.success("用户不存在,请先注册");
        }
      }
    },

    onClickLeft() {
      this.$router.back();
    },

    onClickReg() {
      this.$router.push({
        name: "Reg",
      });
    },
  },
};
</script>