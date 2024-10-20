import { Input, type InputProps } from './input';
import { Select, type SelectProps } from './select';

export type InputSelectProps<T> = {
	select: SelectProps<T>;
	input: InputProps;
};

export const InputSelect = <T,>(props: InputSelectProps<T>) => {
	return (
		<div class={'flex'}>
			<div>
				<Select
					{...props.select}
					className={'rounded-none rounded-l-lg px-5 pe-8 appearance-none'}
				/>
			</div>
			<Input {...props.input} />
		</div>
	);
};
