import { SNSEventRecord } from "aws-lambda";
import { MessageSender } from ".";
import axios from "axios";

export default class IdobataMessageSender implements MessageSender {
  sendMessage(record: SNSEventRecord) {
    const idobataHookUrl = process.env.WEBHOOK_URL!;
    const params = new URLSearchParams({
      source: record.Sns.Message
    });
    return axios.post(idobataHookUrl, params);
  }
}