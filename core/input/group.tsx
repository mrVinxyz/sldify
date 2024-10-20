import { cva } from 'class-variance-authority';
import type { ClassName, View } from '../types';

export type InputGroupProps = {
	id?: string;
	children: View;
	className?: ClassName;
	size?: InputGroupSizeVariant;
};

const groupStyles = cva('relative w-full col-span-12', {
	variants: {
		size: {
			xs: 'md:col-span-2',
			sm: 'md:col-span-4',
			md: 'md:col-span-6',
			lg: 'md:col-span-8',
			xl: 'md:col-span-10',
			full: 'md:col-span-12',
		},
	},
	defaultVariants: {
		size: 'full',
	},
});

export type InputGroupSizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export const InputGroup = (props: InputGroupProps): View => {
	return (
		<div
			id={props.id}
			class={groupStyles({ size: props.size }) + ' '.concat(props.className || '')}
		>
			{props.children}
		</div>
	);
};
