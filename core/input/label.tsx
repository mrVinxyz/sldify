import type { ClassNames, OptChild, View } from '../types';

export type LabelProps = ClassNames &
	OptChild & {
		for: string;
		label: string;
	};

export const Label = (props: LabelProps): View => {
	return (
		<label
			for={props.for}
			id={props.for + 'Label'}
			class={'mb-2 text-sm font-medium text-gray-800 flex items-center '.concat(
				props.className || '',
			)}
		>
			{props.children || props.label}
		</label>
	);
};
