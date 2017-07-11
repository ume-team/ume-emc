<template>
  <ume-row type="flex" justify="center" align="middle" class="login-container">
    <ume-col :span="7" class="login-form">
      <div class="login-system-title">{{ appTitle }}</div>
      <ume-form :model="loginForm" :rules="loginFormRule" ref="loginForm" @submit="doSubmit">
        <ume-form-item prop="loginId">
          <ume-input v-model="loginForm.loginId" placeholder="登录名" autofocus></ume-input>
        </ume-form-item>
        <ume-form-item prop="password">
          <ume-input type="password" v-model="loginForm.password" placeholder="登录密码"></ume-input>
        </ume-form-item>
        <ume-form-item class="login-button-container">
          <ume-button type="primary" class="login-button" native-type="submit">登录</ume-button>
        </ume-form-item>
      </ume-form>
    </ume-col>
  </ume-row>
</template>

<script>
  import { LoadingIndicator } from '@/component/ui';
  import loginFormRule from '@/model/rule/LoginFormRule';
  import Auth from '@/model/Auth';
  import Util from '@/model/Util';

  export default {
    /**
     * 组件名称
     * @type {String}
     */
    name: 'Login',
    /**
     * 数据绑定对象
     */
    data() {
      return {
        // 前画面路由对象
        fromRouter: {},
        // 登录表单项目校验规则
        loginFormRule,
        // 登录表单对象
        loginForm: {
          loginId: '',
          password: '',
        },
      };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
      /**
       * 系统标题
       * @return {String}
       */
      appTitle() {
        return Util.getConfigValue('APP_TITLE');
      },
    },
    /**
     * 组件事件处理函数
     * @type {Object}
     */
    methods: {
      /**
       * 登录按钮点击事件处理
       * @event
       */
      doSubmit() {
        LoadingIndicator.show();
        Auth.login(this.loginForm.loginId, this.loginForm.password)
          .then(() => {
            LoadingIndicator.hide();
            const path = this.$route.query.path || '/';
            this.$router.push({ path });
          })
          .catch((error) => {
            LoadingIndicator.hide();
            this.$root.handleError(error);
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
    margin-top: 20px;
    text-align: center;
  }
  .login-button {
    width: 200px;
  }
</style>
