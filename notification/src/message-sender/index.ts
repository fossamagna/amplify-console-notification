import { SNSEventRecord } from "aws-lambda";

export interface MessageSender {
  sendMessage(record: SNSEventRecord): Promise<any>
}

export async function getMessageSender(type: string = "slack"): Promise<MessageSender> {
  const Sender = (await import(`./${type}-message-sender`)).default;
  return new Sender();
}
