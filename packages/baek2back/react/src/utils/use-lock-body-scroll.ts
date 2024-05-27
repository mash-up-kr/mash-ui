import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

interface UseLockBodyScrollProps {
	locked?: boolean;
}

export const useLockBodyScroll = ({
	locked = true,
}: UseLockBodyScrollProps) => {
	useIsomorphicLayoutEffect(() => {
		const originalStyle = document.body.style.getPropertyValue("overflow");

		if (locked) {
			document.body.style.setProperty("overflow", "hidden");
		}

		return () => {
			if (locked) {
				document.body.style.setProperty("overflow", originalStyle);
			}
		};
	}, [locked]);
};
