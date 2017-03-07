<template>
  <div id="app">
    <div class="header-wrapper">
      <header class="header">
        <div class="container">
          <h2>{{ appTitle }}</h2>
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
import Util from '@/common/util';
import UmeMenu from '@/common/components/UMEMenu';

export default {
  name: 'main',
  computed: {
    appTitle() {
      return Util.getConfigValue('APP_TITLE');
    },
    menuData() {
      return this.$auth.getUserInfo().accResList;
    },
    activeMenu() {
      return this.$router.currentRoute.path;
    },
  },
  components: {
    UmeMenu,
  },
  created() {
    console.log(this.$router.currentRoute.path);
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
