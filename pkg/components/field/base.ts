import type { JSX } from 'solid-js';

type InputVariant = 'default' | 'success' | 'error';
type InputSize = 'sm' | 'md' | 'lg';

type BaseInputProps = {
	variant?: InputVariant;
	size?: InputSize;
};

const baseInputAriaAttr = (props: {
	'aria-describedby'?: string;
	'aria-invalid'?: boolean;
	required?: boolean;
	variant?: InputVariant;
}) => ({
	'aria-describedby': props['aria-describedby'] || undefined,
	'aria-invalid': props.variant === 'error' ? true : props['aria-invalid'],
	'aria-required': props.required || undefined,
});

export type { InputVariant, InputSize, BaseInputProps };
export { baseInputAriaAttr };
