<template>
  <div>
    <div class="page-title">修改用户</div>
    <el-card class="box-card">
      <user-form :data="form" @submit="doSubmit" @cancel="doCancel">
      </user-form>
    </el-card>
  </div>
</template>
<script>
import ui from '@/model/ui';
import resource from '@/resource';
import UserForm from './UserForm';

export default {
  /**
   * 数据绑定对象
   */
  data() {
    return {
      form: {},
    };
  },
  /**
   * @event
   * 组件初始化事件处理
   */
  created() {
    this.doFetch();
  },
  /**
   * 组件逻辑处理函数
   */
  methods: {
    /**
     * 取得数据
     */
    doFetch() {
      const USER_ID = this.$route.params.USER_ID;
      resource.invoke('EMWS20001', ['RetrieveByPrimaryKey', 'EM_USER',
        { USER_ID }]).then((res) => {
          this.form = res;
        });
    },
    /**
     * @event
     * 提交表单数据
     */
    doSubmit() {
      resource.invoke('EMWS20001', ['Update', 'EM_USER', this.form]).then(() => {
        ui.Message('数据已成功修改。');
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
