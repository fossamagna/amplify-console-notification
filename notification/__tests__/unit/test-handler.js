'use strict';
const axios = require('axios');
const app = require('../../app.js');
const event = require('../../../events/event.json');

jest.mock('axios');
var context;

beforeAll(() => {
  process.env = Object.assign(process.env, { IDOBATA_WEBHOOK_URL: 'https://idobata.io/hook/custom/xxxxx' });
});

describe('Tests index', function () {
  test('verifies successful response', async () => {
    axios.post.mockResolvedValue(Promise.resolve());
    const result = await app.lambdaHandler(event, context)

    const params = new URLSearchParams({
      source: "\"Build notification from the AWS Amplify Console for app: https://dev.appId.amplifyapp.com/. Your build status is SUCCEED. Go to https://console.aws.amazon.com/amplify/home?region=ap-northeast-1#appId/dev/1 to view details on your build. \""
    });
    expect(axios.post).toHaveBeenCalledWith("https://idobata.io/hook/custom/xxxxx", params);
  });
});
