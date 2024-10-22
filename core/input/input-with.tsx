import { Input, type InputProps } from './input';
import type { View } from '../types';
import {cva} from "class-variance-authority";
import {splitProps} from "solid-js";


export type InputWithProps = {
	leading?: View;
	trailing?: View;
	input: InputProps;
};

const inputWithClasses = cva('', {
	variants: {
		leading: {
			true: 'ps-10',
			false: '',
		},
		trailing: {
			true: 'pe-10',
			false: '',
		},
	},
});

export const InputWith = (props: InputWithProps) => {
	const [prop, others] = splitProps(props, ['leading', 'trailing', 'input']);

	return (
		<div class='relative'>
			{prop.leading}
			<Input
				className={inputWithClasses({
					leading: !!prop.leading,
					trailing: !!prop.trailing,
				}).concat(' ', prop.input.className || '')}
				{...prop.input}
				{...others}
			/>
			{prop.trailing}
		</div>
	);
};
