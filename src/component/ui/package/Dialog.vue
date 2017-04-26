<template>
  <el-dialog
    :title="title"
    :modal="modal"
    :modalAppendToBody="modalAppendToBody"
    :lockScroll="lockScroll"
    :closeOnClickModal="closeOnClickModal"
    :closeOnPressEscape="closeOnPressEscape"
    :showClose="showClose"
    :size="size"
    :customClass="customClass"
    :top="top"
    :value="value"
    @input="doInput"
    @open="doOpen"
    @close="doClose">
    <slot v-if="isCacheDialogContent"></slot>
    <slot name="footer"></slot>
  </el-dialog>
</template>
<script>
  export default {
    name: 'UmeDialog',
    props: {
      title: {
        type: String,
        default: '',
      },
      modal: {
        type: Boolean,
        default: true,
      },
      modalAppendToBody: {
        type: Boolean,
        default: true,
      },
      lockScroll: {
        type: Boolean,
        default: true,
      },
      closeOnClickModal: {
        type: Boolean,
        default: true,
      },
      closeOnPressEscape: {
        type: Boolean,
        default: true,
      },
      showClose: {
        type: Boolean,
        default: true,
      },
      size: {
        type: String,
        default: 'small',
      },
      customClass: {
        type: String,
        default: '',
      },
      top: {
        type: String,
        default: '15%',
      },
      value: Boolean,
      cache: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      isCacheDialogContent() {
        let ret = this.cache;
        if (!ret) {
          ret = this.value;
        }
        return ret;
      },
    },
    methods: {
      doInput(val) {
        this.$emit('input', val);
      },
      doOpen() {
        this.$emit('open');
      },
      doClose() {
        this.$emit('close');
      },
    },
  };
</script>
