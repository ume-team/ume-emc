<template>
  <router-view></router-view>
</template>

<script>
  import { LoadingIndicator, Notice } from '@/component/ui';
  import ErrorHandler from '@/model/ErrorHandler';
  import Vue from 'vue';

  export default {
    name: 'app',
    computed: {
      loadingState() {
        return this.$store.state.common.loading;
      },
    },
    watch: {
      loadingState: {
        immediate: true,
        handler(val) {
          if (val) {
            LoadingIndicator.show();
          } else {
            LoadingIndicator.hide();
          }
        },
      },
    },
    created() {
      Vue.config.errorHandler = (err, vm) => {
        this.handleAppError(err, vm);
      };
      window.onerror = (err) => {
        this.handleAppError(err);
      };
    },
    data() {
      return {
      };
    },
    methods: {
      handleAppError(error, source) {
        // 取得错误内容
        const errorMessage = ErrorHandler.handleError(error, source);
        // 显示错误
        Notice.showMessage(errorMessage);
      },
    },
  };
</script>
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
</style>
