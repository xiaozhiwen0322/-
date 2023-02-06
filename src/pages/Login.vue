<template>
  <div class="login-box">
    <h3>系统登录</h3>
    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      class="demo-dynamic"
      :model="form"
      :rules="rules"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" class="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from "mockjs";
import Cookie from "js-cookie";

import { getMenu } from "../api";
export default {
  name: "myLogin",
  data() {
    return {
      form: { username: "", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              this.$store.commit("getMenu", data.data.menu);
              this.$store.commit("addRouter", this.$router);
              this.$router.push("/home");
            } else {
              alert("用户名或密码错误");
            }
            //   const token = Mock.Random.guid();
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input {
    width: 180px;
  }
  h3 {
    text-align: center;
    margin: 0px auto 40px auto;
    color: #505458;
  }
  .submit {
    margin-left: 105px;
    margin-top: 10px;
  }
}
</style>