<template>
  <form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]" @submit="doSubmit($event)">
    <slot></slot>
  </form>
</template>
<script>
  import { Form } from 'element-ui';
  import Util from '@/model/Util';

  export default {
    mixins: [Form],
    name: 'UmeForm',
    props: {
      // 表单提交是否重载页面
      isPrevent: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      doSubmit(event) {
        // 定义了校验规则的场合
        if (!Util.isEmpty(this.rules)) {
          // 使用定义的校验规则进行校验
          this.validate((valid) => {
            // 校验成功的场合
            if (valid) {
              // 触发submit事件
              this.$emit('submit');
            }
          });
        }
        if (this.isPrevent) {
          event.preventDefault();
        }
      },
    },
  };
</script>
