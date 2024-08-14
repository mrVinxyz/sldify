import type { JSX } from 'solid-js';

type CardProps = {
	children: JSX.Element;
	className?: string;
};

const Top = ({ children, className = '' }: CardProps) => {
	return (
		<div class={`w-full col-span-12 flex mb-4 pb-4 border-b ${className}`}>
			{children}
		</div>
	);
};

const Flex = ({ children, className = '' }: CardProps) => {
	return (
		<div
			class={`w-full relative col-span-12 flex p-4 space-y-4 ${className}`}>
			{children}
		</div>
	);
};

const Grid = ({ children, className = '' }: CardProps) => {
	return (
		<div class={`w-full relative grid grid-cols-12 gap-4 ${className}`}>
			{children}
		</div>
	);
};

const Bottom = ({ children, className = '' }: CardProps) => {
	return (
		<div class={`w-full col-span-12 flex mt-4 pt-4 border-t ${className}`}>
			{children}
		</div>
	);
};

export const Card = {
	Top,
	Bottom,
	Flex,
	Grid,
};
