import axios from 'axios';
import { URLSearchParams } from 'url';
import { SNSEvent, SNSEventRecord, Context } from 'aws-lambda';

export async function lambdaHandler(event: SNSEvent, context: Context) {
  try {
    await Promise.all(event.Records.map(postMessage));
  } catch (err) {
    console.log(err);
    return err;
  }
};

function postMessage(record: SNSEventRecord) {
  const idobataHookUrl = process.env.IDOBATA_WEBHOOK_URL!;
  const params = new URLSearchParams({
    source: record.Sns.Message
  });
  return axios.post(idobataHookUrl, params);
}
