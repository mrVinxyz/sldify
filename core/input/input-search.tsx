import { createInput, Input, type InputContext, type InputProps } from './input';
import type { ClassName, ClassNames } from '../types';
import { SubmitBtn } from '../button';
import { Select, type SelectProps } from './select';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';

type InputSearchProps = InputProps &
	ClassNames & {
		onSearch?: (ctx: InputContext) => void;
		size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
		inputClass?: ClassName;
		btnClass?: ClassName;
	};

const inputSearchSizeStyles = cva('relative', {
	variants: {
		size: {
			sm: 'w-48',
			md: 'w-64',
			lg: 'w-80',
			xl: 'w-96',
			full: 'w-full',
			none: '',
		},
	},
	defaultVariants: {
		size: 'none',
	},
});

export const InputSearch = (props: InputSearchProps) => {
	const [prop, others] = splitProps(props, [
		'className',
		'inputClass',
		'btnClass',
		'size',
		'onSearch',
	]);
	const inputCtx = createInput(others.name);

	return (
		<div class={inputSearchSizeStyles({ size: prop.size }).concat(' ', prop.className || '')}>
			<Input
				{...others}
				ctx={inputCtx}
				onEnter={(ctx) => prop?.onSearch?.(ctx)}
				className={props.inputClass}
			/>
			<SubmitBtn
				className={'absolute top-0 right-0 h-full rounded-none rounded-r-lg '.concat(
					prop.btnClass || '',
				)}
				size='sqr_md'
				color='primary'
				onPress={() => prop?.onSearch?.(inputCtx)}
			>
				<svg
					class='w-4 h-4'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 20 20'
				>
					<path
						stroke='currentColor'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
					/>
				</svg>
				<span class='sr-only'>Search</span>
			</SubmitBtn>
		</div>
	);
};

export const InputSearchSelect = <T,>(props: {
	search: InputSearchProps;
	select: SelectProps<T>;
}) => {
	return (
		<div class={'flex'}>
			<div>
				<Select
					{...props.select}
					className={'rounded-none rounded-l-lg px-5 pe-8 appearance-none'}
				/>
			</div>
			<InputSearch
				{...props.search}
				inputClass={'rounded-none rounded-r-lg'}
			/>
		</div>
	);
};
