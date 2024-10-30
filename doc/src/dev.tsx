import { Collapsible } from 'pkg/components/collapsible/collapsible';
import { CollapsibleContent } from 'pkg/components/collapsible/content';
import { CollapsibleControl } from 'pkg/components/collapsible/control';
import {
	InputSelect,
	type InputSelectOption,
	type InputSelectProps,
} from 'pkg/components/input/input-select';
import type { AnyProp } from 'pkg/utils/types';
import { Button } from 'pkg';
import ColorModeToggler from 'pkg/components/button/color-mode-toggler';

export default () => {
	const CollapsibleButton = (props: AnyProp) => {
		return <Button {...props} />;
	};

	type User = {
		id: number;
		name: string;
	};

	const options = [
		{ label: 'Option 1', value: { id: 1, name: 'Option 1' } },
		{ label: 'Option 2', value: { id: 2, name: 'Option 2' } },
	];

	return (
		<>
			<ColorModeToggler
				textContent={'Color'}
				size={'sqr-md'}
			/>
			<InputSelect<string>
				options={[
					{
						label: 'Option 1',
						value: 'value1',
					},
					{
						label: 'Option 2',
						value: 'value2',
					},
				]}
				onSelected={(option: InputSelectOption<string>) => {
					console.log(option.value.toUpperCase());
				}}
			/>
		</>
	);
};
