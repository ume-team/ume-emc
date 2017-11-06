const rules = {
  USER_MOBILE: [
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
};
export default rules;
