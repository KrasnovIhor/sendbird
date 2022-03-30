export type ChatMessage = SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage;
export type UserData = {
	id: string;
	nickname: string;
};
