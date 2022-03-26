import { ReactElement, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import SendBird, { OpenChannel } from 'sendbird';
import { useSendbirdInstance } from '../../hooks/useSendbirdInstance';
import { Message } from '../../uikit/Message/Message';
import { SendMessage } from '../SendMessage/SendMessage';

import styles from './Messages.module.scss';

interface MessagesProps {
	channel: OpenChannel;
}

export type ChatMessage = SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage;

export const Messages = ({ channel }: MessagesProps): ReactElement => {
	const { subscribeMessages, unsubscribeHandler, loadPrevMessages } = useSendbirdInstance();
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	useEffect(() => {
		subscribeMessages('test', (_, message) => {
			if (message) {
				setMessages([message]);
			}
		});

		if (channel.url) {
			loadPrevMessages(channel.url, (messageList, error) => {
				if (error) {
					alert(error.message);
					return;
				}

				setMessages([...messageList]);
			});
		}

		return () => {
			unsubscribeHandler('test');
		};
	}, [subscribeMessages, unsubscribeHandler, channel, loadPrevMessages, channel.url]);

	return (
		<div className={styles.root}>
			{channel.url && (
				<div>
					<Image src={channel.coverUrl} alt='open channel cover image' />
					<div className={styles.messages}>
						{messages.map((message) => (
							<Message message={message} key={message.messageId} />
						))}
					</div>
					<SendMessage />
				</div>
			)}
		</div>
	);
};
