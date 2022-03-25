import { ReactElement, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import SendBird, { OpenChannel } from 'sendbird';
import { useSendbirdInstance } from '../../hooks/useSendbirdInstance';
import { SendMessage } from '../SendMessage/SendMessage';

import styles from './Messages.module.scss';

interface MessagesProps {
	channel: OpenChannel;
}

export type ChatMessage = SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage;

export const Messages = ({ channel }: MessagesProps): ReactElement => {
	const { subscribeMessages, unsubscribeHandler, loadPrevMessages } = useSendbirdInstance();
	const [messages, setMessages] = useState<any[]>([]);

	useEffect(() => {
		subscribeMessages('test', (_, message) => {
			if (message) {
				setMessages((prev) => [...prev, message]);
			}
		});

		if (channel.url) {
			loadPrevMessages(channel.url, (messageList, error) => {
				if (error) {
					alert(error.message);
					return;
				}

				setMessages((prev) => [...prev, ...messageList]);
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
					<div>
						{messages.map((message) => (
							<p key={message.messageId}>{message.message}</p>
						))}
					</div>
					<SendMessage />
				</div>
			)}
		</div>
	);
};
