"use client"

import { useWindowSize } from "../../hooks/useWindowSize";

interface ImageBgProps {
	image: string;
	children: React.ReactNode;
	[key: string]: any;
}

export function ImageBg({ image, children, ...props }: ImageBgProps) {

	const size = useWindowSize();

	const isMobile = size.width && size.width < 768;
	const setImageBg = (): string => {
		if (isMobile || isMobile === undefined) {
			return `url(${image}-mobile.png)`;
		}

		return `url(${image}.png)`;
	}

	return (
		<div style={{ backgroundImage: setImageBg() }} {...props}>
			{children}
		</div>
	)
}
