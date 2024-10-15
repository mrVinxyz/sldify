import { Button, type ButtonProps } from './button';
import { useNavigate } from '@solidjs/router';

export const ButtonBack = (props: ButtonProps) => {
	const goBack = useNavigate();

	return (
		<Button
			onClick={() => goBack(-1)}
			onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && goBack(-1)}
			{...props}
		/>
	);
};
