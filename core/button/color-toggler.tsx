import { Button, type ButtonProps } from './button';

export const ColorToggler = (props: ButtonProps) => {
	return (
		<Button
			{...props}
			onPress={(e) => {
				const doc = document.documentElement.classList;
				doc.contains('dark') ? doc.remove('dark') : doc.add('dark');
				props.onPress?.(e);
			}}
		/>
	);
};
