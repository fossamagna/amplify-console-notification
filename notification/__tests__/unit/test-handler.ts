import { lambdaHandler } from '../../src/app';
import { Context } from 'aws-lambda';
const event = require('../../../events/event.json');
const axios = require('axios');

jest.mock('axios');
var context: Context;



describe('app.ts', function () {

  describe('idobata', () => {
    beforeAll(() => {
      process.env = Object.assign(process.env, {
        SENDER_TYPE: 'idobata',
        WEBHOOK_URL: 'https://idobata.io/hook/custom/xxxxx'
      });
    });
  
    test('lambdaHandler invoke sendMessage function of idobata message sender', async () => {
      axios.post.mockResolvedValue(Promise.resolve());
      const result = await lambdaHandler(event, context)
  
      const params = new URLSearchParams({
        source: "\"Build notification from the AWS Amplify Console for app: https://dev.appId.amplifyapp.com/. Your build status is SUCCEED. Go to https://console.aws.amazon.com/amplify/home?region=ap-northeast-1#appId/dev/1 to view details on your build. \""
      });
      expect(axios.post).toHaveBeenCalledWith("https://idobata.io/hook/custom/xxxxx", params);
    });
  });

  describe('slack', () => {
    beforeAll(() => {
      process.env = Object.assign(process.env, {
        SENDER_TYPE: 'slack',
        WEBHOOK_URL: 'https://hooks.slack.com/services/XXXXXXX/YYYYYYYY/ZZZZZZZZZZ'
      });
    });
  
    test('lambdaHandler invoke sendMessage function of slack message sender', async () => {
      axios.post.mockResolvedValue(Promise.resolve());
      const result = await lambdaHandler(event, context)
  
      const body = {
        text: "\"Build notification from the AWS Amplify Console for app: https://dev.appId.amplifyapp.com/. Your build status is SUCCEED. Go to https://console.aws.amazon.com/amplify/home?region=ap-northeast-1#appId/dev/1 to view details on your build. \""
      };
      expect(axios.post).toHaveBeenCalledWith("https://hooks.slack.com/services/XXXXXXX/YYYYYYYY/ZZZZZZZZZZ", body);
    });
  });
});
