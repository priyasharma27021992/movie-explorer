import { cn } from '@/utils/common';
import { TOOLTIP_POSITION } from './types';
import { useEffect, useState } from 'react';
interface ToolTipProps {
	position?: (typeof TOOLTIP_POSITION)[keyof typeof TOOLTIP_POSITION];
	text?: string;
	className?: string;
	children?: React.ReactNode;
}

const Tooltip = ({
	position = TOOLTIP_POSITION.TOP,
	text,
	className,
	children,
}: ToolTipProps) => {
	const [active, setActive] = useState(false);
	let timeout: ReturnType<typeof setTimeout> | null = null;

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, 400);
	};

	const hideTip = () => {
		setActive(false);
	};
	useEffect(() => {
		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, []);

	console.log('text', text);
	if (!text) return null;
	return (
		<div
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
			className='relative'>
			{children}
			{active && (
				<div
					className={cn(
						'absolute py-2 rounded-sm z-1 w-[130px] text-[#000] text-center bg-background shadow-lg',
						position,
						className
					)}>
					{text}
				</div>
			)}
		</div>
	);
};

export { Tooltip };
