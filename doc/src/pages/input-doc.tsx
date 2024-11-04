import DocumentTmpl from "../doc-template";
import {Input} from "pkg/components/input/input";

function InputDoc() {
    return (
        <DocumentTmpl
            title="Input"
            description="A flexible and accessible input component that supports various styles and states."
            importCode={`import { Input } from './components/input'`}
            features={[
                "Rich styling options including variants, sizes and border radius customization",
                "Built-in form states for success and error handling",
                'Built-in accessibility attributes',
            ]}
            apiReference={[
                {
                    prop: "variant",
                    type: "'default' | 'success' | 'error'",
                    defaultValue: "'default'",
                    description: "Controls the visual style and state of the input"
                },
                {
                    prop: "size",
                    type: "'xs' |  'sm' | 'md' | 'lg' | 'xl'",
                    defaultValue: "'md'",
                    description: "Determines the padding and overall size of the input"
                },
                {
                    prop: "rounded",
                    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
                    defaultValue: "'lg'",
                    description: "Controls the border radius of the input"
                },
                {
                    prop: "disabled",
                    type: "boolean",
                    defaultValue: "false",
                    description: "When true, prevents user interaction and applies a disabled style"
                },
                {
                    prop: "class",
                    type: "string",
                    defaultValue: "''",
                    description: "Additional CSS classes to apply to the input"
                }
            ]}
            examples={[
                {
                    title: "Basic Usage",
                    description: "A simple text input with default styling",
                    component: ()=> (
                        <Input
                            type="text"
                            placeholder="Enter your name"
                        />
                    )
                },
                {
                    title: "Input Variants",
                    description: "Different states for validation feedback",
                    component: ()=> (
                        <>
                            <Input
                                type="text"
                                placeholder="Default input"
                            />
                            <Input
                                type="text"
                                variant="success"
                                placeholder="Success input"
                            />
                            <Input
                                type="text"
                                variant="error"
                                placeholder="Error input"
                            />
                        </>
                    )
                },
                {
                    title: "Input Sizes",
                    description: "Available size variations",
                    component: ()=> (
                        <>
                            <Input
                                type="text"
                                size="xs"
                                placeholder="Extra Small input"
                            />
                            <Input
                                type="text"
                                size="sm"
                                placeholder="Small input"
                            />
                            <Input
                                type="text"
                                size="md"
                                placeholder="Medium input"
                            />
                            <Input
                                type="text"
                                size="lg"
                                placeholder="Large input"
                            />
                        </>
                    )
                },
                {
                    title: "Border Radius Options",
                    description: "Different border radius styles",
                    component: ()=> (
                        <>
                            <Input
                                type="text"
                                rounded="none"
                                placeholder="No radius"
                            />
                            <Input
                                type="text"
                                rounded="sm"
                                placeholder="Small radius"
                            />
                            <Input
                                type="text"
                                rounded="md"
                                placeholder="Medium radius"
                            />
                            <Input
                                type="text"
                                rounded="lg"
                                placeholder="Large radius"
                            />
                            <Input
                                type="text"
                                rounded="xl"
                                placeholder="Extra Large radius"
                            />
                            <Input
                                type="text"
                                rounded="full"
                                placeholder="Full radius"
                            />
                        </>
                    )
                }
            ]}
            keyboard={[
                {
                    key: "Tab",
                    description: "Moves focus to the input"
                },
                {
                    key: "Shift + Tab",
                    description: "Moves focus to the previous focusable element"
                }
            ]}
            accessibility={[
                "Proper ARIA attributes for input states (required, invalid, disabled)",
                "Automatic aria-describedby linking for error messages",
                "High contrast colors in both light and dark modes",
                "Keyboard navigation support",
                "Clear focus indicators",
                "Support for screen readers through semantic HTML and ARIA attributes"
            ]}
        />
    );
}

export default InputDoc;