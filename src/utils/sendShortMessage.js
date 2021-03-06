const Core = require('@alicloud/pop-core');
const messageConfig = require('../config/app').message;

const client = new Core({
  accessKeyId: messageConfig.accessKey,
  accessKeySecret: messageConfig.accessSecret,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
});

const params = {
  RegionId: 'cn-hangzhou',
  PhoneNumbers: '15691777182',
  SignName: messageConfig.signName,
  TemplateCode: 'SMS_198916183',
  TemplateParam: '{"code":"125485"}',
};

/**
 * 发送短信验证码
 * @param {Number} phone 手机号
 * @returns {Object} 错误信息，验证码，验证码发送时间
 */
exports.sendShortMessage = async (phone) => {
  const code = parseInt(Array.from({ length: 6 }).map(() => parseInt(Math.random() * 10, 10)).join(''), 10);
  const sendParams = {
    ...params,
    TemplateParam: `{"code":"${code}"}`,
    PhoneNumbers: phone,
  };

  let sendTime = null;
  try {
    await client.request('SendSms', sendParams, { method: 'POST' });
    sendTime = new Date().getTime();
    return { error: null, code, sendTime };
  } catch (error) {
    if (error) {
      return { error: error.data.Message };
    }
    return { error: null, code, sendTime };
  }
};
