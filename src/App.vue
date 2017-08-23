<template>
  <router-view></router-view>
</template>
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    font-family: Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
</style>
<script>
  import Setaria from 'setaria';
  import { LoadingIndicator, Notice } from '@/component/ui';

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
      // 程序抛出的错误信息处理
      Setaria.config.errorHanlder = (err) => {
        Notice.showMessage(err.noIdMessage);
      };
    },
    data() {
      return {
      };
    },
    methods: {
    },
  };
</script>
