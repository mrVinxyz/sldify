import IntroDoc from '../../components/intro-doc';
import { Anatomy } from '../../components/anatomy';
import { ApiReference } from '../../components/api-reference';
import { Examples } from '../../components/example';
import { CheckboxField } from 'pkg/components/field/checkbox';

const anatomy = `<CheckboxField
  // Field attributes
  name=""
  label=""
  help=""
  error=""
  required={}
  
  // CheckboxField attributes
  value={}
  checked={}
  onChange={}
  size=""
  variant=""
  class=""
/>`;

const apiRef = {
    components: [
        {
            name: 'CheckboxField',
            description: 'A form field component that combines a checkbox input with label and supporting elements into a cohesive interface',
            props: [
                // Field-specific props
                {
                    name: 'name',
                    type: 'string',
                    required: true,
                    description: 'Field identifier for labels and aria attributes',
                },
                {
                    name: 'label',
                    type: 'string',
                    required: true,
                    description: 'Label text for the field',
                },
                {
                    name: 'help',
                    type: 'string',
                    description: 'Helper text displayed below the checkbox',
                },
                {
                    name: 'error',
                    type: 'string',
                    description: 'Error message displayed when validation fails',
                },
                {
                    name: 'containerClass',
                    type: 'string',
                    description: 'Additional classes for the field container',
                },
                {
                    name: 'labelClass',
                    type: 'string',
                    description: 'Additional classes for the label',
                },
                {
                    name: 'labelSrOnly',
                    type: 'boolean',
                    description: 'Whether to visually hide the label',
                },
                {
                    name: 'required',
                    type: 'boolean',
                    description: 'Whether the field is required',
                },
                // CheckboxField-specific props
                {
                    name: 'value',
                    type: 'unknown',
                    required: true,
                    description: 'Value associated with the checkbox when checked',
                },
                {
                    name: 'checked',
                    type: 'boolean',
                    description: 'Controlled checked state of the checkbox',
                },
                {
                    name: 'onChange',
                    type: '(value: unknown) => void',
                    description: 'Callback fired when checkbox state changes, receives the checkbox value',
                },
                {
                    name: 'variant',
                    type: '"default" | "success" | "error"',
                    default: 'default',
                    description: 'Visual style with matching state indicator',
                },
                {
                    name: 'size',
                    type: '"sm" | "md" | "lg"',
                    default: 'md',
                    description: 'Size of the checkbox element',
                },
                {
                    name: 'class',
                    type: 'string',
                    description: 'Additional classes for the checkbox element',
                },
            ],
        },
    ],
};

const examples = [
    {
        title: 'Basic Usage',
        description: { text: 'Standard checkbox field with label' },
        preview: () => (
            <div class='w-full max-w-sm'>
                <CheckboxField
                    name='terms'
                    label='I agree to the terms and conditions'
                    value='accepted'
                />
            </div>
        ),
    },
    {
        title: 'Field States',
        description: { text: 'Checkbox fields with different states and supporting text' },
        preview: () => (
            <div class='space-y-4 w-full max-w-sm'>
                <CheckboxField
                    name='newsletter'
                    label='Subscribe to newsletter'
                    help='Receive updates about our products'
                    value='subscribed'
                />
                <CheckboxField
                    name='verified'
                    label='Account verified'
                    variant='success'
                    value='verified'
                    checked={true}
                />
                <CheckboxField
                    name='invalid'
                    label='Invalid selection'
                    variant='error'
                    error='This selection is required'
                    value='invalid'
                />
            </div>
        ),
    },
    {
        title: 'Size Variations',
        description: { text: 'Different checkbox sizes with consistent field layout' },
        preview: () => (
            <div class='space-y-4 w-full max-w-sm'>
                <CheckboxField
                    name='small'
                    label='Small Checkbox'
                    size='sm'
                    value='small'
                />
                <CheckboxField
                    name='medium'
                    label='Medium Checkbox'
                    size='md'
                    value='medium'
                />
                <CheckboxField
                    name='large'
                    label='Large Checkbox'
                    size='lg'
                    value='large'
                />
            </div>
        ),
    },
    {
        title: 'Disabled State',
        description: { text: 'Disabled state with visual indicators' },
        preview: () => (
            <div class='space-y-2 w-full max-w-sm'>
                <CheckboxField
                    name='disabled'
                    label='Disabled Checkbox'
                    disabled
                    value='disabled'
                />
            </div>
        ),
    },
];

const CheckboxFieldDoc = () => {
    return (
        <>
            <IntroDoc
                component='CheckboxField'
                description='A comprehensive checkbox field component that combines a checkbox input with label and supporting elements. Supports various states, sizes, and validation states.'
            />
            <Anatomy>{anatomy}</Anatomy>
            <ApiReference components={apiRef.components}/>
            <Examples examples={examples}/>
        </>
    );
};

export default CheckboxFieldDoc;