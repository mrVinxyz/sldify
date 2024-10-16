import type { JSX } from 'solid-js';
import { Input, type InputProps } from './input';

export type InputWithProps = {
	leading?: JSX.Element;
	trailing?: JSX.Element;
	input: InputProps;
};

export const InputWith = (props: InputWithProps) => {
	return (
		<>
			{props.leading && (
				<div class='relative'>
					{props.leading}
					<Input
						className={'ps-10'}
						{...props.input}
					/>
				</div>
			)}

			{props.trailing && (
				<div class='relative'>
					{props.trailing}
					<Input
						className={'pe-10'}
						{...props.input}
					/>
				</div>
			)}
		</>
	);
};
