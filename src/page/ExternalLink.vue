<template>
  <div>
    点击此处在新窗口内打开链接：<ume-button type="text" @click="doLinkClick">{{ link }}</ume-button>
    <iframe :src="link" class="external-link-container"
    frameborder="0"
    scrolling="yes" v-if="link"></iframe>
    <template v-else>
      链接不存在或无效
    </template>
  </div>
</template>
<style scoped>
  .external-link-container {
    width: 100%;
    height: 70vh;
  }
</style>
<script>
export default {
  data() {
    return {
      link: this.$route.params.link,
    };
  },
  methods: {
    doLinkClick() {
      window.open(this.link, '_blank');
    },
  },
};
</script>
