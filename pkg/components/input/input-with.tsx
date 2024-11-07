import { Input, type InputProps } from './input';
import type { View } from '../../utils/types';
import { type Component, splitProps } from 'solid-js';

type InputWithTrailing = InputProps & {
	trailing: View;
	leading?: never;
};

type InputWithLeading = InputProps & {
	leading: View;
	trailing?: never;
};

type InputWithProps = InputWithLeading | InputWithTrailing;

const InputWith: Component<InputWithProps> = (props) => {
	const [local, rest] = splitProps(props, ['trailing', 'leading']);
	return (
		<div class={'relative'}>
			{local.leading}
			<Input {...rest} />
			{local.trailing}
		</div>
	);
};

export { type InputProps, InputWith };
