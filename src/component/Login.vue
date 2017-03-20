<template>
  <el-row type="flex" justify="center" align="middle" class="login-container">
    <el-col :span="7" class="login-form">
      <div class="login-system-title">{{ appTitle }}</div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="loginId">
          <el-input v-model="loginForm.loginId" placeholder="登录名" autofocus></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item class="login-button-container">
          <el-button type="primary" size="large" class="login-button" native-type="submit" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import util from '@/model/util';
import auth from '@/model/auth';

export default {
  data() {
    return {
      fromRouter: {},
      rules: {
        loginId: {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      },
      loginForm: {
        loginId: '',
        password: '',
      },
    };
  },
  computed: {
    appTitle() {
      return util.getConfigValue('APP_TITLE');
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          auth.login(this.loginForm.loginId, this.loginForm.password)
            .then(() => {
              const path = this.$route.query.path || '/';
              this.$router.push({ path });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
  .login-container {
    height: 100%;
    background-color: #4fa6e6;
  }
  .login-system-title {
    text-align: center;
    color: #4fa6e6;
    font-size: 24px;
    font-weight: 900;
    padding: 20px;
  }
  .login-form {
    min-width: 300px;
    background-color: #FCFCFD;
    padding: 20px;
    border-radius: 10px;
  }
  .login-button-container {
    text-align: center;
  }
  .login-button {
    width: 200px;
  }
</style>
