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
					<span class='absolute top-3.5 left-3.5'>{props.leadingIcon}</span>
					<InputEl
						class={'ps-10'}
						{...props.input}
					/>
				</div>
			)}

			{props.trailingIcon && (
				<div class='relative'>
					<span class='absolute top-3.5 right-3.5'>{props.trailingIcon}</span>
					<InputEl
						class={'pe-10'}
						{...props.input}
					/>
				</div>
			)}
		</>
	);
};
