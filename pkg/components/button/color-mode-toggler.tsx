import { Button, type ButtonProps } from './button';
import { type Component, splitProps } from 'solid-js';
import toggleColorMode from '../../utils/color-mode';

const ColorModeToggler: Component<ButtonProps> = (props) => {
	const [local, rest] = splitProps(props, ['onClick']);
	return (
		<Button
			onClick={(e) => {
				if (typeof local.onClick === 'function') local.onClick(e);
				toggleColorMode();
			}}
			{...rest}
		/>
	);
};

export default ColorModeToggler;
