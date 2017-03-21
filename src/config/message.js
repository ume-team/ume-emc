// M[Message Catagory]XXX[Message Type]
// Message Catagory:
//   AM Application Message
//   CM Common Message
//   BM Bussiness Message
// Message Type:
//   E Error
//   I Info
//   W Warning
const MESSAGE = {
  MAM001E: '服务调用出现网络错误，无法调用指定服务，请检查网络。',
  MAM002E: '由于您长时间未操作，登录状态已过期，系统将在{0}秒后自动跳转至登录页面。',
  MAM003E: '服务未在预定时间（{0}秒）内返回结果，请联系管理员或稍后重试。',
};
export default MESSAGE;
