import { SNSEvent, SNSEventRecord, Context } from 'aws-lambda';
import { getMessageSender } from './message-sender';

export async function lambdaHandler(event: SNSEvent, context: Context) {
  try {
    await Promise.all(event.Records.map(postMessage));
  } catch (err) {
    console.log(err);
    return err;
  }
};

async function postMessage(record: SNSEventRecord) {
  const type = process.env.SENDER_TYPE;
  const sender = await getMessageSender(type);
  return sender.sendMessage(record);
}
