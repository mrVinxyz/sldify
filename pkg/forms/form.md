# Form Component

The Form component provides a centralized state management system for handling form data, validation, submission, and error states. It serves as the container for Field components and manages the overall form lifecycle.

## Installation

```typescript
import { Form, Forms, useForm, FormContext, FormConfig, FormProps } from '@your-library/forms';
```

## Core Concepts

### Form Data Types
```typescript
type FormsData = Record<string, any>;
type FormErr = Record<string, string>;
type FormStatus = 'initial' | 'validating' | 'error' | 'submitting' | 'success' | 'failure';
```

### Form Context
The form context provides methods and state for form management:

```typescript
type FormContext = {
    name: Readonly<string>;                    // Form identifier
    state: Store<FormsData>;                   // Form values store
    setState: SetStoreFunction<FormsData>;     // Update form values
    errors: Store<FormErr>;                    // Form errors store
    setErrors: SetStoreFunction<FormErr>;      // Update form errors
    status: Accessor<FormStatus>;              // Current form status
    setStatus: Setter<FormStatus>;             // Update form status
    validate: () => Promise<boolean>;          // Trigger validation
    submit: () => Promise<void>;               // Trigger submission
    reset: () => void;                         // Reset form state
};
```

## Usage

### Basic Form Setup

```typescript
import { Forms } from '@your-library/forms';

function MyForm() {
    return (
        <Forms
            form={{
                name: 'registrationForm',
                initialState: {
                    email: '',
                    password: ''
                },
                config: {
                    onSubmit: async (values) => {
                        await submitToAPI(values);
                    },
                    onValidate: async (values) => {
                        const errors: FormErr = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        }
                        return errors;
                    }
                }
            }}
        >
            {(form) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    form.submit();
                }}>
                    {/* Form fields */}
                    <button 
                        type="submit"
                        disabled={form.status() === 'submitting'}
                    >
                        Submit
                    </button>
                </form>
            )}
        </Forms>
    );
}
```

### Using the Form Hook

```typescript
function FormStatusIndicator() {
    const form = useForm();
    
    return (
        <div className="form-status">
            {form.status() === 'submitting' && <Spinner />}
            {form.status() === 'error' && 
                <div className="error">
                    Please fix the errors before submitting
                </div>
            }
            {form.status() === 'success' && 
                <div className="success">
                    Form submitted successfully!
                </div>
            }
        </div>
    );
}
```

## API Reference

### Forms Component

#### Props
```typescript
type FormProps = {
    name: string;                // Unique form identifier
    initialState: FormsData;     // Initial form values
    config?: FormConfig;         // Form configuration
};

type FormConfig = {
    onSubmit?: (values: FormsData) => Promise<void> | void;
    onValidate?: (values: FormsData) => Promise<FormErr>;
    onReset?: () => void;
};
```

#### Form Context Methods

| Method | Type | Description |
|--------|------|-------------|
| `state` | `Store<FormsData>` | Current form values |
| `setState` | `SetStoreFunction<FormsData>` | Update form values |
| `errors` | `Store<FormErr>` | Current form errors |
| `setErrors` | `SetStoreFunction<FormErr>` | Update form errors |
| `status` | `Accessor<FormStatus>` | Current form status |
| `validate` | `() => Promise<boolean>` | Trigger form validation |
| `submit` | `() => Promise<void>` | Trigger form submission |
| `reset` | `() => void` | Reset form to initial state |

#### Form Status States

| Status | Description |
|--------|-------------|
| `initial` | Form's default state |
| `validating` | Form is currently validating |
| `error` | Form has validation errors |
| `submitting` | Form is being submitted |
| `success` | Form was submitted successfully |
| `failure` | Form submission failed |

## Features

### State Management
- Centralized form state management
- Automatic state synchronization with fields
- Granular control over form values and errors

### Validation
- Configurable validation logic
- Asynchronous validation support
- Field-level and form-level validation
- Automatic error state management

### Submission Handling
- Configurable submission logic
- Automatic status management
- Error handling and recovery
- Success/failure state tracking

### Reset Functionality
- Complete form state reset
- Custom reset handler support
- Field state synchronization

## Best Practices

1. **Form Names**: Use unique, descriptive names for forms to avoid conflicts
2. **Validation**: Implement both client-side and server-side validation
3. **Error Handling**: Handle all possible submission states and errors
4. **State Updates**: Use the provided context methods for state updates
5. **Status Management**: Monitor form status for UI feedback

## Examples

### Complete Form with Validation

```typescript
function RegistrationForm() {
    return (
        <Forms
            form={{
                name: 'registration',
                initialState: {
                    username: '',
                    email: '',
                    password: ''
                },
                config: {
                    onValidate: async (values) => {
                        const errors: FormErr = {};
                        
                        if (!values.username) {
                            errors.username = 'Username is required';
                        }
                        
                        if (!values.email.includes('@')) {
                            errors.email = 'Invalid email format';
                        }
                        
                        if (values.password.length < 8) {
                            errors.password = 'Password must be at least 8 characters';
                        }
                        
                        return errors;
                    },
                    onSubmit: async (values) => {
                        await api.register(values);
                    },
                    onReset: () => {
                        console.log('Form was reset');
                    }
                }
            }}
        >
            {(form) => (
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const isValid = await form.validate();
                    if (isValid) {
                        await form.submit();
                    }
                }}>
                    <Field name="username">
                        {(field) => (
                            <div>
                                <input
                                    value={field.value() || ''}
                                    onInput={(e) => field.setValue(e.currentTarget.value)}
                                />
                                {field.error() && (
                                    <span className="error">{field.error()}</span>
                                )}
                            </div>
                        )}
                    </Field>
                    
                    {/* Similar fields for email and password */}
                    
                    <div className="form-actions">
                        <button 
                            type="submit"
                            disabled={form.status() === 'submitting'}
                        >
                            {form.status() === 'submitting' ? 'Submitting...' : 'Submit'}
                        </button>
                        <button 
                            type="button"
                            onClick={form.reset}
                        >
                            Reset
                        </button>
                    </div>
                    
                    {form.status() === 'success' && (
                        <div className="success-message">
                            Registration successful!
                        </div>
                    )}
                </form>
            )}
        </Forms>
    );
}
```

### Form with Custom Error Handling

```typescript
function FormWithErrorHandling() {
    return (
        <Forms
            form={{
                name: 'errorExample',
                initialState: { data: '' },
                config: {
                    onSubmit: async (values) => {
                        try {
                            await api.submit(values);
                        } catch (error) {
                            // Convert API errors to form errors
                            const formErrors: FormErr = {
                                data: error.message
                            };
                            throw formErrors;
                        }
                    }
                }
            }}
        >
            {(form) => (
                <div>
                    <Field name="data">
                        {(field) => (
                            <input
                                value={field.value() || ''}
                                onInput={(e) => field.setValue(e.currentTarget.value)}
                            />
                        )}
                    </Field>
                    
                    {form.status() === 'failure' && (
                        <div className="error-summary">
                            {Object.values(form.errors).map(error => (
                                <div key={error} className="error">{error}</div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Forms>
    );
}
```
