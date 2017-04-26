<template>
  <div>
    <div class="page-title">新增用户</div>
    <ume-card class="box-card">
      <user-form :data="emUserDTO" @submit="doSubmit" @cancel="doCancel">
      </user-form>
    </ume-card>
  </div>
</template>
<script>
import { Notice } from '@/component/ui';
import EmUserDTO from '@/model/dto/EmUserDTO';
import Message from '@/model/Message';
import UserForm from './UserForm';

export default {
  /**
   * 数据绑定对象
   */
  data() {
    return {
      emUserDTO: new EmUserDTO(),
    };
  },
  /**
   * 组件逻辑处理函数
   */
  methods: {
    /**
     * @event
     * 提交表单数据
     */
    doSubmit() {
      this.$root.callService('EMS20001', ['Create', 'EM_USER', this.form]).then(() => {
        const message = new Message('MCM001I', ['用户']);
        Notice.showMessage({
          message,
        });
        this.forwardToSearch();
      });
    },
    /**
     * @event
     * 返回按钮点击事件处理
     */
    doCancel() {
      this.forwardToSearch();
    },
    /**
     * 跳转至检索画面
     */
    forwardToSearch() {
      this.$router.push({ name: 'UserSearch' });
    },
  },
  /**
   * 使用的组件
   */
  components: {
    UserForm,
  },
};
</script>
