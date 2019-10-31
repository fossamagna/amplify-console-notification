const axios = require('axios');
const { URLSearchParams } = require('url');

exports.lambdaHandler = async (event, context) => {
  try {
    await Promise.all(event.Records.map(postMessage));
  } catch (err) {
    console.log(err);
    return err;
  }
};

function postMessage(record) {
  const idobataHookUrl = process.env.IDOBATA_WEBHOOK_URL;
  const params = new URLSearchParams({
    source: record.Sns.Message
  });
  return axios.post(idobataHookUrl, params);
}
