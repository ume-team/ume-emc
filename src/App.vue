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
          <el-menu default-active="2" theme="dark" class="nav-menu" :router="true">
            <template v-for="(menuItem, menuIndex) in menuArray">
              <el-submenu v-if="menuItem.children" :index="menuIndex + ''">
                <template slot="title">{{ menuItem.name }}</template>
                <el-menu-item v-for="(menuChildItem, menuChildIndex) in menuItem.children" :index="menuChildItem.path">
                  {{ menuChildItem.name }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="menuItem.path">
                {{ menuItem.name }}
              </el-menu-item>
            </template>
          </el-menu>
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
import util from './common/util';

const menuData = [
  {
    name: '用户管理',
    children: [
      {
        name: '用户列表',
        path: '/entity/search/user',
      },
      {
        name: '新增用户',
        path: '/entity/create/user',
      },
    ],
  },
  {
    name: '权限管理',
    path: '/role/search',
  },
];

export default {
  name: 'app',
  computed: {
    appTitle() {
      return util.getConfigValue('APP_TITLE');
    },
    menuArray() {
      return menuData;
    },
  },
};
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  #app, body, html {
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
