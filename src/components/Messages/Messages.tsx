import { useContext, useEffect, useState } from 'react';
import { useSubscription, useLoadPrevMessages } from 'hooks';

import { ChatContext } from 'providers';

import { Message } from 'uikit';
import { SendMessage } from 'components';

import { ChatMessage } from 'types';

import { Image } from 'react-bootstrap';

import styles from './Messages.module.scss';

export const Messages: React.FC = () => {
	const { subscribe } = useSubscription('receive-subscription');
	const { currentOpenChannel } = useContext(ChatContext);
	const { prevMessages } = useLoadPrevMessages();

	const [messages, setMessages] = useState<ChatMessage[]>([]);

	useEffect(() => {
		subscribe((_, message) => {
			if (message) {
				setMessages((prev) => [...prev, message]);
			}
		});

		setMessages(prevMessages);
	}, [subscribe, prevMessages]);

	const onMessageSendHandler = (message: ChatMessage | undefined) => {
		if (message) {
			setMessages((prev) => [...prev, message]);
		}
	};

	return (
		<>
			<div className={styles.root}>
				{currentOpenChannel.url && (
					<div>
						<Image src={currentOpenChannel.coverUrl} alt='open channel cover image' />
						<div className={styles.messages}>
							{messages.map((message) => (
								<Message message={message} key={message.messageId} />
							))}
						</div>
					</div>
				)}
			</div>
			<SendMessage onSubmit={onMessageSendHandler} />
		</>
	);
};
