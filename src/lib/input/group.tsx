import type { Element } from '../types';

/**
 * Props for the Group component.
 */
export type GroupProps = {
	/** The child elements to be rendered inside the group. */
	children: Element;
	/** The input field size. Default `md`*/
	size?: InputGroupSize;
	/** The id of the group element. */
	id?: string;
};

/** The input field size.
 * @values xs=2; sm=4; md=6; lg=8; xl=10; full=12;
 */
export type InputGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Group component to wrap child elements with additional styling.
 *
 * @param {GroupProps} props - The properties for the Group component.
 * @returns {JSX.Element} - The rendered Group component.
 */
export const InputGroup = (props: GroupProps): Element => {
	return (
		<div
			classList={{
				'relative w-full col-span-12': true,
				'md:col-span-2': props.size === 'xs',
				'md:col-span-4': props.size === 'sm',
				'sm:col-span-6': props.size === 'md',
				'md:col-span-8': props.size === 'lg',
				'md:col-span-10': props.size === 'xl',
				'md:col-span-12': props.size === 'full',
			}}
		>
			{props.children}
		</div>
	);
};
