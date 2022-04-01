import { RefObject, useEffect, useRef, useCallback } from 'react';

type UseChatScrollReturn = {
	ref: RefObject<HTMLDivElement>;
	scrollHandler: () => void;
};

export function useChatScroll<T>(deps?: T, isOnUpdate: boolean = true): UseChatScrollReturn {
	const ref = useRef<HTMLDivElement>(null);

	const scrollHandler = useCallback(() => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, []);

	useEffect(() => {
		if (isOnUpdate) {
			scrollHandler();
		}
	}, [deps, isOnUpdate, scrollHandler]);

	return { ref, scrollHandler };
}
