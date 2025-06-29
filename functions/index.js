const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const Core = require('@alicloud/pop-core');

// 用 firebase functions:config:set aliyun.keyid="xxx" aliyun.keysecret="yyy" 设置环境变量
const accessKeyId = 'LTAI5t94QHggL3k6dE5kqfhf';
const accessKeySecret ='lmx9jhV@26sYCWImEHR5DTFX9q5LzV';
const signName ='lazymicezhu';
const templateCode = 'SMS_489700526';

exports.sendSms = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }
    const { phoneNumber, templateParam } = req.body;

    const client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    });

    const params = {
      PhoneNumbers: phoneNumber,
      SignName: signName,
      TemplateCode: templateCode,
      TemplateParam: JSON.stringify(templateParam)
    };

    try {
      const result = await client.request('SendSms', params, { method: 'POST' });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message, detail: err.data });
    }
  });
}); 