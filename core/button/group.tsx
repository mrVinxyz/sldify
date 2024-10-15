import { cva, type VariantProps } from 'class-variance-authority';
import { For, splitProps } from 'solid-js';
import { Button, type ButtonProps } from './button';
import type { ClassName } from '../types';

export type ButtonGroupProps = VariantProps<typeof buttonGroupStyles> &
	ButtonProps & {
		buttons: ButtonProps[];
		className?: ClassName;
		size?: 'rec_sm' | 'rec_md' | 'rec_lg' | 'sqr_sm' | 'sqr_md' | 'sqr_lg';
		color?:
			| 'primary'
			| 'secondary'
			| 'success'
			| 'danger'
			| 'warning'
			| 'alert'
			| 'light'
			| 'dark';
		disabled?: boolean;
		loading?: boolean;
		onPress?: () => void;
	};

const buttonGroupStyles = cva('', {
	variants: {
		layout: {
			row: 'inline-flex flex-row',
			col: 'inline-flex flex-col',
		},
	},
});

export const ButtonGroup = (props: ButtonGroupProps) => {
	const ifReturn = (predicate: boolean, val: string) => (predicate ? val : '');
	const [local, btnOthers] = splitProps(props, ['layout', 'buttons']);

	return (
		<div
			class={'rounded-lg '.concat(buttonGroupStyles({ layout: props.layout }))}
			role='group'
		>
			<For each={local.buttons}>
				{(btnProp, i) => {
					const isFirst = i() === 0;
					const isLast = i() === props.buttons.length - 1;

					let className = 'rounded-none ';
					switch (local.layout) {
						case 'row':
							className += ifReturn(isFirst, 'rounded-s-md ');
							className += ifReturn(isLast, 'rounded-e-md ');
							break;
						case 'col':
							className += ifReturn(isFirst, 'rounded-t-md ');
							className += ifReturn(isLast, 'rounded-b-md ');
							break;
						default:
							break;
					}

					return (
						<Button
							{...btnProp}
							{...btnOthers}
							className={className.trimEnd()}
						/>
					);
				}}
			</For>
		</div>
	);
};
