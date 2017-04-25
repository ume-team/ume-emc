<template>
  <div id="app">
    <div class="header-wrapper">
      <header class="header">
        <div class="system-title">
          {{ appTitle }}
        </div>
        <ul class="nav">
          <li class="nav-item">
            {{ userName }}
          </li>
          <li class="nav-item">
            <ume-button type="primary" class="login-button" @click="doLogout">注销</ume-button>
          </li>
        </ul>
      </header>
    </div>
    <div class="main-container">
      <ume-row>
        <ume-col :span="4" class="nav-menu-container">
          <system-menu class="nav-menu" :data="accResList" :activeMenu="activeMenu"></system-menu>
        </ume-col>
        <ume-col :span="20" class="page-container">
          <router-view></router-view>
        </ume-col>
      </ume-row>
    </div>
  </div>
</template>
<script>
  import Auth from '@/model/Auth';
  import Util from '@/model/Util';
  import SystemMenu from '@/component/menu/SystemMenu';

  export default {
    // 组件名称
    name: 'Dashboard',
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
      /**
       * 用户名称
       * @return {String}
       */
      userName() {
        return Auth.getUserInfo().user.userName;
      },
      /**
       * 菜单数据
       * @return {String}
       */
      accResList() {
        return Auth.getUserInfo().accResList;
      },
      /**
       * 当前使用的菜单项
       * @return {String}
       */
      activeMenu() {
        return this.$router.currentRoute.path;
      },
    },
    /**
     * 组件事件处理函数
     * @type {Object}
     */
    methods: {
      /**
       * 注销按钮点击事件处理
       * @event
       */
      doLogout() {
        // 调用登出服务
        Auth.logout().then(() => {
          this.forwardToLogin();
        }).catch(() => {
          this.forwardToLogin();
        });
      },
      /**
       * 跳转至登录页面
       */
      forwardToLogin() {
        this.$router.push({ name: 'Login' });
      },
    },
    /**
     * 使用的子组件列表
     * @type {Object}
     */
    components: {
      SystemMenu,
    },
  };
</script>
<style>
  #app {
    height: 100%;
  }
  .header-wrapper {
    height: 60px;
  }
  .header {
    height: 60px;
    background-color: white;
    color: #677375;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    z-index: 100;
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .system-title{
    margin: 0;
    float: left;
    font-size: 20px;
    font-weight: 900;
    width: 240px;
    text-align: left;
    padding-left: 10px;
  }
  .header .nav {
    float: right;
    width: 200px;
    height: 100%;
    line-height: 60px;
    background: transparent;
    padding: 0;
    margin: 0;
  }
  .header .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    margin-left: 20px;
  }
  .main-container {
    width: 100%;
    margin-top: -60px;
    padding: 60px 0 0;
    box-sizing: border-box;
    min-height: 100%;
    height: 100%;
  }
  .main-container .page-container {
    padding: 10px;
    background-color: #edeef2;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .main-container > .el-row,
  .main-container > .el-row > .el-col,
  .main-container .nav-menu,
  .page-container {
    height: 100%;
  }
  .main-container .nav-menu-container {
    overflow-x: none;
    overflow-y: auto;
    height: 100%;
  }
  .page-title {
    font-size: 18px;
    font-weight: 500;
    color: #677375;
    padding: 10px 2px;
  }
</style>
