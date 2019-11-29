import { SNSEventRecord } from "aws-lambda";
import { MessageSender } from ".";
import axios from "axios";

export default class SlackMessageSender implements MessageSender {
  sendMessage(record: SNSEventRecord) {
    const slackHookUrl = process.env.WEBHOOK_URL!;
    const body = {
      text: record.Sns.Message
    };
    return axios.post(slackHookUrl, body);
  }
}
