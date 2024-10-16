import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassName, View } from '../types';

/** Props for the Group component. */
export type InputGroupProps = VariantProps<typeof groupStyles> & {
	/** The id of the group element. */
	id?: string;
	/** The child elements to be rendered inside the group. */
	children: View;
	className?: ClassName;
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

/**
 * The input field size.
 * @values xs=2; sm=4; md=6; lg=8; xl=10; full=12;
 */
export type InputGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Group component to wrap child elements with additional styling.
 *
 * @param {InputGroupProps} props - The properties for the Group component.
 * @returns {View} - The rendered Group component.
 */
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
