import { Input, type InputProps } from './input';
import type { View } from '../types';

export type InputWithProps = {
	leading?: View;
	trailing?: View;
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
