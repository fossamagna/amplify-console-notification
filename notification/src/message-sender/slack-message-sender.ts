import { SNSEventRecord } from "aws-lambda";
import { MessageSender } from ".";
import axios from "axios";

export default class SlackMessageSender implements MessageSender {
  sendMessage(record: SNSEventRecord) {
    const slackHookUrl = process.env.WEBHOOK_URL!;

    const text = record.Sns.Message;
    
    let color = "#C0C0C0";
    if (text.includes("SUCCEED")) {
      color = "good";
    } else if (text.includes("FAILED")) {
      color = "danger";
    } else if (text.includes("STARTED")) {
      color = "#EBF6F7";
    }

    const body = {
      text: text,
      color: color
    };
    return axios.post(slackHookUrl, body);
  }
}
