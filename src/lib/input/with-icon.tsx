import type { JSX } from 'solid-js';
import { InputEl, type InputProps } from './input';

export const InputWithIcon = (props: {
	leadingIcon?: JSX.Element;
	trailingIcon?: JSX.Element;
	input: InputProps;
}) => {
	return (
		<>
			{props.leadingIcon && (
				<div class='relative'>
					<span class='absolute top-4 left-4'>{props.leadingIcon}</span>
					<InputEl
						class={'input-with-icon-leading'}
						{...props.input}
					/>
				</div>
			)}

			{props.trailingIcon && (
				<div class='relative'>
					<span class='absolute top-4 right-4'>{props.trailingIcon}</span>
					<InputEl
						class={'input-with-icon-trailing'}
						{...props.input}
					/>
				</div>
			)}
		</>
	);
};
