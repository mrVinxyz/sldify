import { cva } from 'class-variance-authority';
import type {JSX} from "solid-js";

/** Props for the Group component. */
export type InputGroupProps = {
	/** The child elements to be rendered inside the group. */
	children: JSX.Element;
	/** The input field size. */
	size?: InputGroupSize;
	/** The id of the group element. */
	id?: string;
};

/**
 * The input field size.
 * @values xs=2; sm=4; md=6; lg=8; xl=10; full=12;
 */
export type InputGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Group component to wrap child elements with additional styling.
 *
 * @param {InputGroupProps} props - The properties for the Group component.
 * @returns {JSX.Element} - The rendered Group component.
 */
export const InputGroup = (props: InputGroupProps): JSX.Element => {
	const groupClasses = cva('relative w-full col-span-12', {
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

	return (
		<div
			id={props.id}
			class={groupClasses({ size: props.size })}
		>
			{props.children}
		</div>
	);
};
