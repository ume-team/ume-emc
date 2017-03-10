<template>
  <div id="app">
    <div class="header-wrapper">
      <header class="header">
        <div class="container">
          <h2>{{ appTitle }}</h2>
          <ul class="nav">
            <li class="nav-item">
              {{ userName }}
            </li>
            <li class="nav-item">
              <el-button type="primary" size="large" class="login-button" @click="logout">注销</el-button>
            </li>
          </ul>
        </div>
      </header>
    </div>
    <div class="main-container">
      <el-row>
        <el-col :span="4">
          <ume-menu class="nav-menu" :data="menuData" :active-menu="activeMenu"></ume-menu>
        </el-col>
        <el-col :span="20">
          <div class="page-container page-component">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import util from '@/model/util';
import auth from '@/model/auth';
import UmeMenu from '@/component/menu/UmeMenu';

export default {
  name: 'main',
  computed: {
    appTitle() {
      return util.getConfigValue('APP_TITLE');
    },
    userName() {
      return auth.getUserInfo().user.userName;
    },
    menuData() {
      return auth.getUserInfo().accResList;
    },
    activeMenu() {
      return this.$router.currentRoute.path;
    },
  },
  methods: {
    logout() {
      auth.logout().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
  components: {
    UmeMenu,
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
  }
  .header .container {
    height: 100%;
    box-sizing: border-box;
  }
  .header h2 {
    margin: 0;
    float: left;
    font-size: 24px;
    font-weight: 400;
  }
  .header .nav {
    float: right;
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
  .container, .page-container {
    width: 1140px;
    margin: 0 auto;
  }
  .main-container {
    margin-top: -60px;
    padding: 60px 0 0;
    box-sizing: border-box;
    min-height: 100%;
    height: 100%;
  }
  .main-container .el-row,
  .main-container .el-row .el-col,
  .main-container .nav-menu,
  .page-container {
    height: 100%;
  }
  .page-component {
    box-sizing: border-box;
  }
  .page-container {
    padding: 10px;
    background-color: #edeef2;
  }
</style>
