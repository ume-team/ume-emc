<template>
  <div class="system-layout system-layout-has-sider">
    <div class="system-layout-sider">
      <div class="system-layout-sider-children">
        <div class="system-title-container">
          <span class="title"><img src="../assets/logo_512*512.png" class="system-logo"/>{{ appTitle }}</span>
        </div>
        <system-menu class="nav-menu" :data="accResList" :activeMenu="activeMenu"></system-menu>
      </div>
    </div>
    <div class="system-layout system-layout-content">
      <div class="system-layout-header">
        <span class="nav-container">
          <span class="nav-item">
            {{ userName }}
          </span>
          <span class="nav-item">
            <ume-button type="primary" class="login-button" @click="doLogout">注销</ume-button>
          </span>
        </span>
      </div>
      <div class="system-layout-page-content">
        <ume-breadcrumb separator="/" class="system-bread-crumb">
          <ume-breadcrumb-item v-for="crumb in breadCrumb" :to="{ path: crumb.path }" :key="crumb.name">{{ crumb.meta.title }}</ume-breadcrumb-item>
        </ume-breadcrumb>
        <router-view></router-view>
      </div>
      <div class="system-layout-footer">
        UME System ©2017 Created by UME Team
      </div>
    </div>
  </div>
</template>
<style>
  .system-layout {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    background: #ececec;
  }
  .system-layout-has-sider {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .system-layout-sider {
    -webkit-transition: all .15s cubic-bezier(.645,.045,.355,1);
    transition: all .15s cubic-bezier(.645,.045,.355,1);
    position: relative;
    background: #324157;
    min-width: 0;
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0px;
    flex: 0 0 200px;
    max-width: 200px;
    min-width: 200px;
    width: 200px;
  }
  .system-layout-content {
    margin-left: 200px;
    overflow-x: hidden;
    height: 100vh;
  }
  .system-layout-header {
    background: #f1f1f1;
    padding: 0 10px;
    height: 64px;
    line-height: 64px;
  }
  .nav-container {
    float: right;
  }
  .nav-item + .nav-item {
    margin-left: 10px;
  }
  .system-layout-footer {
    padding: 24px 50px;
    color: rgba(0,0,0,.65);
    font-size: 12px;
  }
  .system-layout-footer, .system-layout-header {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }
  .system-layout-page-content {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    padding: 10px;
  }
  .system-title-container {
    height: 64px;
    line-height: 64px;
    text-align: center;
    background: #324157;
  }
  .system-logo {
    width: 40px;
    margin-top: -5px;
    vertical-align: middle;
  }
  .title {
    vertical-align: text-bottom;
    font-size: 18px;
    text-transform: uppercase;
    display: inline-block;
    color: #bfcbd9;
  }
  .system-bread-crumb {
    margin-bottom: 10px;
  }
</style>
<script>
  import SystemMenu from '@/component/menu/SystemMenu';
  import BizUtil from '@/model/BizUtil';
  import UserResource from '@/model/resource/UserResource';

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
        return BizUtil.getConfigValue('APP_TITLE');
      },
      /**
       * 用户名称
       * @return {String}
       */
      userName() {
        return UserResource.getUser().user.userName;
      },
      /**
       * 菜单数据
       * @return {String}
       */
      accResList() {
        return UserResource.getUser().accResList;
      },
      /**
       * 当前使用的菜单项
       * @return {String}
       */
      activeMenu() {
        return this.$router.currentRoute.path;
      },
      /**
       * 面包屑
       * @return {Array}
       */
      breadCrumb() {
        return this.$route.matched.map((item, index) => {
          const ret = item;
          if (ret.path === '' && index === 0) {
            ret.path = '/';
          }
          return ret;
        });
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
        UserResource.logout(UserResource.getUser().user.userId).then(() => {
          this.forwardToLogin();
        }).catch(() => {
          this.forwardToLogin();
        });
      },
      /**
       * 跳转至登录页面
       */
      forwardToLogin() {
        this.$router.forwardTo('Login');
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
