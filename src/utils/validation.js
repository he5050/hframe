/*
 * @Author: 陈建君 
 * @Date: 2018-01-22 13:42:36 
 * @Last Modified by: 陈建君
 * @Last Modified time: 2018-05-10 15:17:26
 */
const validation = {
  // 验证身份证号
  verifyIDCard(idCard) {
    return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(idCard);
  },
  
  // 验证手机号
  verifyPhone(phone) {
    return /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(phone);
  },
};

export default validation;
