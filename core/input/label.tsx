import type { ClassNames, View } from '../types';

export type LabelProps = ClassNames & {
	/** The id of the input element this label is associated with. */
	for: string;
	/** The text content of the label. */
	label: string;
};

/**
 * Label component to render a label for an input element.
 *
 * @param {string} props.for - The id of the input element this label is associated with.
 * @param {string} props.label - The text content of the label.
 * @returns {View} - The rendered Label component.
 */
export const Label = (props: LabelProps): View => {
	return (
		<label
			for={props.for}
			id={props.for + 'Label'}
			class={'mb-2 text-sm font-medium text-gray-800 flex items-center '.concat(
				props.className || '',
			)}
		>
			{props.label}
		</label>
	);
};
