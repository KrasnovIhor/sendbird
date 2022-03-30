import { FC } from 'react';
import { Card, Image } from 'react-bootstrap';

import cn from 'classnames';

import styles from './Message.module.scss';
import { ChatMessage } from 'types';

interface MessageProps {
	message: ChatMessage;
}

export const Message: FC<MessageProps> = ({ message }) => {
	const isTextMessage = message.messageType === 'admin' || message.messageType === 'user';
	const isImage = message.messageType === 'file' && message.type?.includes('image');

	return (
		<Card className={styles.root}>
			<Card.Body className={cn({ [styles.admin]: message.isAdminMessage() })}>
				{!message.isAdminMessage() && (
					<span className={styles.sender}>{message.sender?.nickname}</span>
				)}
				{isTextMessage
					? message.message
					: isImage && <Image src={message.url} alt={message.name} />}
			</Card.Body>
		</Card>
	);
};
