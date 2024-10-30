# Field Component

The Field component is part of our forms library, providing granular control over form field state management. It manages individual field values, validation states, and user interactions while maintaining synchronization with the parent form.

## Installation

```typescript
import { Field, useField, FieldProps, FieldState, FieldContextProps } from '@your-library/forms';
```

## Core Concepts

### Field State
Each field maintains its own state with the following properties:

```typescript
type FieldState<T> = {
    value: T | undefined;     // Current field value
    error: string;           // Validation error message
    touched: boolean;        // Whether field has been interacted with
    dirty: boolean;         // Whether value differs from initial value
};
```

### Field Context
The field context provides methods to interact with the field state:

```typescript
type FieldContextProps<T> = {
    value: () => T | undefined;              // Get current value
    setValue: (value: T | undefined) => void; // Update value
    error: () => string;                     // Get current error
    setError: (error: string) => void;       // Set error message
    touched: () => boolean;                  // Check if field was touched
    dirty: () => boolean;                    // Check if value changed
    reset: () => void;                       // Reset to initial state
};
```

## Usage

### Basic Usage

```typescript
import { Field } from '@your-library/forms';

function MyForm() {
    return (
        <Field name="email">
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
    );
}
```

### Using the Field Hook

```typescript
import { useField } from '@your-library/forms';

function CustomInput() {
    const field = useField();
    
    return (
        <div>
            <input
                value={field.value() || ''}
                onInput={(e) => field.setValue(e.currentTarget.value)}
                className={field.dirty() ? 'modified' : ''}
            />
            <span>{field.touched() ? 'Field touched' : 'Pristine'}</span>
        </div>
    );
}
```

## API Reference

### Field Component

#### Props
```typescript
type FieldProps = {
    name: string;                                   // Unique field identifier
    children: (ctx: FieldContextProps) => View;     // Render function
};
```

#### Field Context Methods

| Method | Type | Description |
|--------|------|-------------|
| `value()` | `() => T \| undefined` | Returns current field value |
| `setValue(value)` | `(value: T \| undefined) => void` | Updates field value and marks as touched |
| `error()` | `() => string` | Returns current error message |
| `setError(error)` | `(error: string) => void` | Sets field error message |
| `touched()` | `() => boolean` | Returns whether field has been interacted with |
| `dirty()` | `() => boolean` | Returns whether value differs from initial |
| `reset()` | `() => void` | Resets field to initial state |

## Features

### Automatic Form Synchronization
- Fields automatically sync their state with the parent form
- Changes to field values update the form state
- Form-level errors are reflected in individual fields
- Bidirectional updates ensure consistency

### State Management
- Maintains local state for improved performance
- Tracks user interactions via `touched` state
- Monitors value changes through `dirty` state
- Provides controlled reset functionality

### Error Handling
- Supports local error state management
- Synchronizes with form-level validation
- Provides error setting and clearing utilities

## Best Practices

1. **Unique Names**: Always provide unique `name` props to avoid state conflicts
2. **Error Handling**: Handle both field-level and form-level errors appropriately
3. **Reset Handling**: Use the `reset()` method to clear field state when needed
4. **Performance**: Utilize local state management for optimal performance

## Examples

### Custom Field Component

```typescript
function CustomField() {
    return (
        <Field name="custom">
            {(field) => (
                <div className="field-wrapper">
                    <input
                        value={field.value() || ''}
                        onInput={(e) => field.setValue(e.currentTarget.value)}
                        onBlur={() => {
                            if (!field.value()) {
                                field.setError('Field is required');
                            }
                        }}
                        className={field.error() ? 'error' : ''}
                    />
                    {field.error() && (
                        <div className="error-message">{field.error()}</div>
                    )}
                    {field.dirty() && (
                        <button onClick={field.reset}>Reset</button>
                    )}
                </div>
            )}
        </Field>
    );
}
```

### Field with Validation

```typescript
function ValidatedField() {
    return (
        <Field name="email">
            {(field) => (
                <div>
                    <input
                        type="email"
                        value={field.value() || ''}
                        onInput={(e) => {
                            const value = e.currentTarget.value;
                            field.setValue(value);
                            
                            // Basic email validation
                            if (!value.includes('@')) {
                                field.setError('Invalid email format');
                            } else {
                                field.setError('');
                            }
                        }}
                    />
                    <div className="field-status">
                        {field.touched() && !field.error() && '✓'}
                        {field.error() && (
                            <span className="error">{field.error()}</span>
                        )}
                    </div>
                </div>
            )}
        </Field>
    );
}
```
