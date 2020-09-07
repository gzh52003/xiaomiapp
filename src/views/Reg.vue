<template>
  <div>
    <van-nav-bar title="免费会员注册" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-form validate-first :model="ruleForm" ref="ruleForm">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="ruleForm.username"
        prop="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        @change="sortForm"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="ruleForm.password"
        prop="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="ruleForm.password1"
        prop="password1"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <!--
      <van-field v-model="sms" prop="vcode" center clearable label="输入验证码" placeholder="请输入验证码">
        <template #button>
          <van-button size="small" type="primary" @click="getVcode" v-html="vcodeSvg"></van-button>
        </template>
      </van-field>-->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="submitReg">注册</van-button>
      </div>

      <p class="mi_register" @click="onClickLogin">已有账号? 登录</p>
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
        password1: "",
      },
    };
  },
  methods: {
    async submitReg() {
      if (
        this.ruleForm.username &&
        this.ruleForm.password === this.ruleForm.password1
      ) {
        const { data } = await this.$request({
          method: "post",
          url: "/reg",
          data: {
            ...this.ruleForm
          },
        });
        console.log("data=", data);
        if (data.code === 1) {
          Toast.success("注册成功");
          // return false;
          const { redirectTo = "/login" } = this.$route.query;
          console.log("redirectTo=", redirectTo);
          this.$router.replace(redirectTo);
        }
      } else {
        Toast.success("密码不一致");
        this.ruleForm.password = "";
        this.ruleForm.password1 = "";
      }
    },
    // 回退
    onClickLeft() {
      this.$router.back();
    },
    // 有了账号去登录
    onClickLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    // 去重
    async sortForm(){
      return false;
      // trim()去除字符串头尾空格
      console.log("return=",this.ruleForm.username);
      const _username = this.ruleForm.username.trim()
      if(!_username) return;

      const result = await this.$request.get("/reg/check",{
        params:{
           username:_username
        }
      })
      console.log("result=",result);
    }
  },
};
</script>