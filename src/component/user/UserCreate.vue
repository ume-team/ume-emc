<template>
  <div>
    <div class="page-title">新增用户</div>
    <el-card class="box-card">
      <user-form :data="form" @submit="doSubmit" @cancel="doCancel">
      </user-form>
    </el-card>
  </div>
</template>
<script>
import Message from '@/model/Message';
import ui from '@/model/ui';
import resource from '@/resource';
import UserForm from './UserForm';

export default {
  /**
   * 数据绑定对象
   */
  data() {
    return {
      form: {
        USER_ID: '',
        USER_NAME: '',
        USER_INTEREST: [],
        USER_MOBILE: '',
        USER_SEX: '1',
        USER_IDENTITY_CARD: '',
        USER_LOCATION_PROVINCE: '004',
        USER_BIRTHDAY: '',
        USER_ADDRESS: '',
        USER_EMAIL: '',
      },
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
      resource.invoke('EMWS20001', ['Create', 'EM_USER', this.form]).then(() => {
        ui.UMEMessage.showMessage(new Message('MCM001I', ['用户']));
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
