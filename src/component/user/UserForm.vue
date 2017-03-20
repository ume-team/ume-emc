<template>
  <el-form ref="form" :model="data" :rules="rules" label-width="120px" label-position="right">
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户识别ID" prop="USER_ID">
        <el-input v-model="data.USER_ID"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户名称" prop="USER_NAME">
        <el-input v-model="data.USER_NAME"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户性别" prop="USER_SEX">
        <el-radio class="radio" v-model="data.USER_SEX" label="1">男</el-radio>
        <el-radio class="radio" v-model="data.USER_SEX" label="2">女</el-radio>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户生日" prop="USER_BIRTHDAY">
        <el-date-picker v-model="data.USER_BIRTHDAY" type="date" placeholder="选择出生日期">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户手机" prop="USER_MOBILE">
        <el-input v-model="data.USER_MOBILE"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户所在城市" prop="USER_LOCATION_PROVINCE">
        <el-select v-model="data.USER_LOCATION_PROVINCE" placeholder="请选择所在城市">
          <el-option label="北京市" value="001"></el-option>
          <el-option label="天津市" value="002"></el-option>
          <el-option label="上海市" value="003"></el-option>
          <el-option label="辽宁省" value="004"></el-option>
          <el-option label="吉林省" value="005"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="24">
      <el-form-item label="用户兴趣" prop="USER_INTEREST">
        <el-checkbox-group v-model="data.USER_INTEREST">
          <el-checkbox label="钓鱼" name="USER_INTEREST"></el-checkbox>
          <el-checkbox label="游戏" name="USER_INTEREST"></el-checkbox>
          <el-checkbox label="音乐" name="USER_INTEREST"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户身份证号" prop="USER_IDENTITY_CARD">
        <el-input v-model="data.USER_IDENTITY_CARD"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="用户邮箱" prop="USER_EMAIL">
        <el-input v-model="data.USER_EMAIL"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="24">
      <el-form-item label="用户地址" prop="USER_ADDRESS">
        <el-input type="textarea" v-model="data.USER_ADDRESS"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="{span:24, pull:0}" :sm="24" class="form-button-container">
      <el-col :xs="24" :sm="12" :pull="1" class="form-submit-button-container">
        <el-button type="primary" size="large" class="form-button" native-type="submit" @click="doSubmit('form')">提交</el-button>
      </el-col>
      <el-col :xs="{span:24, pull:0}" :sm="12" :push="1" class="form-cancel-button-container">
        <el-button type="primary" size="large" class="form-button" @click="doCancel()">返回</el-button>
      </el-col>
    </el-col>
  </el-form>
</template>
<script>
export default {
  /**
   * 组件属性
   */
  props: {
    data: Object,
  },
  /**
   * 数据绑定对象
   */
  data() {
    return {
      rules: {
        USER_ID: [
          { required: true, message: '请输入用户识别ID', trigger: 'blur' },
        ],
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
    doSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit');
        }
      });
    },
    /**
     * @event
     * 返回按钮点击事件处理
     */
    doCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
<style scoped>
.form-button-container .form-submit-button-container {
  margin-bottom: 22px;
}
.form-button-container .form-cancel-button-container {
  margin-bottom: 22px;
}
@media (max-width: 768px) {
  .form-button-container .form-button {
    width: 100%;
  }
  .form-button-container .form-submit-button-container {
    text-align: center;
    right: 0;
  }
  .form-button-container .form-cancel-button-container {
    text-align: center;
    left: 0;
  }
}
@media (min-width: 768px) {
  .form-button-container .form-button {
    width: 200px;
  }
  .form-button-container .form-submit-button-container {
    text-align: right;
  }
  .form-button-container .form-cancel-button-container {
    text-align: left;
  }
}
</style>
