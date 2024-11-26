import { Label } from '../input/label';
import generateId from '../../utils/id';
import { type Component, type JSX, splitProps, type ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type FieldGroupProps = {
	name: string;
	label: string;
	required?: boolean;
	help?: string;
	error?: string;
	containerClass?: string;
	labelClass?: string;
	labelSrOnly?: boolean;
	variant?: 'default' | 'error' | 'success';
	child: ValidComponent;
} & Omit<JSX.IntrinsicElements['div'], 'children'>;

const FieldGroup: Component<FieldGroupProps> = (props) => {
	const [local] = splitProps(props, [
		'label',
		'variant',
		'containerClass',
		'labelClass',
		'labelSrOnly',
		'required',
		'help',
		'error',
		'name',
		'child',
	]);

	const fieldId = generateId('field-'.concat(local.name));
	const helpId = local.help ? fieldId.concat('-help') : undefined;
	const errorId = local.error ? fieldId.concat('-error') : undefined;
	const describedByIds = [helpId, errorId].filter(Boolean).join(' ');

	return (
		<div class={'space-y-1 '.concat(local.containerClass || '')}>
			<Label
				for={fieldId}
				variant={local.variant}
				required={local.required}
				srOnly={local.labelSrOnly}
				class={local.labelClass}
			>
				{local.label}
			</Label>

			<Dynamic
				component={local.child}
				id={fieldId}
				aria-describedby={describedByIds || undefined}
				aria-invalid={local.variant === 'error' ? true : undefined}
				aria-required={local.required}
				required={local.required}
			/>

			{local.help && (
				<p
					id={helpId}
					class='mt-1 text-sm text-gray-500 dark:text-gray-400'
				>
					{local.help}
				</p>
			)}

			{local.error && (
				<p
					id={errorId}
					class='mt-1 text-sm text-red-600 dark:text-red-400'
				>
					{local.error}
				</p>
			)}
		</div>
	);
};

export { type FieldGroupProps, FieldGroup };
