import type { JSX } from 'solid-js';

/**
 * A utility type that extracts the value types of an object.
 *
 * @template T - The object type from which to extract value types.
 *
 * @example
 * // Given a type of User
 * type User = {
 *   id: number;
 *   name: string;
 * };
 *
 * type UserValue = ValueOf<User>; // Resulting type: number | string
 */
export type ValueOf<T> = T[keyof T];

/**
 * A type for representing any valid HTML attributes.
 *
 * @example
 * const myProps: PropAttr = {
 *   id: 'button1',
 *   disabled: true,
 *   'aria-label': 'Submit Button'
 *   'data-made-up': 'abc123'
 * };
 *
 * <div {...myProps} />
 */
export type PropsAttr = { [key: string]: unknown };

export type AnyProp = {};

/**
 * Represents a JSX Element.
 *
 * @example
 * const myElement: View = <div>Hello World</div>;
 */
export type View = JSX.Element;

/**
 * A type representing a component with children.
 *
 * @example
 * const myComponent: ChildProp = {
 *   children: <div>Child content</div>
 * };
 */
export type ChildProp = { children: View };

/**
 * A type for components with optional children.
 *
 * @example
 * const myComponent: OptChildProp = {};
 */
export type OptChildProp = { children?: View };

/**
 * A type representing a component context with a generic type.
 *
 * @template T - The type of the context.
 *
 * @example
 * const ctxComponent: ContextProp<{ user: string }> = { ctx: { user: 'John' } };
 */
export type ContextProp<T> = { ctx: T };

/**
 * A type for components with optional context.
 *
 * @template T - The type of the optional context.
 *
 * @example
 * const ctxComponent: OptContextProp<{ user: string }> = {};
 */
export type OptContextProp<T> = { ctx?: T };

export type ChildrenCtxProp<T> = {
	children: (ctx: T) => View;
};

/**
 * HTML attribute `class` mapped to the type of `HTMLElement['className']`.
 *
 * @example
 * const elementClass: ClassName = 'my-class';
 */
export type ClassName = HTMLElement['className'];

/**
 * A type for components with optional class name attributes.
 *
 * @example
 * const myClassNames: ClassNames = { className: 'my-class' };
 */
export type OptClassProp = {
	class?: ClassName;
};

/**
 * A utility type that creates a new type by omitting specified properties from the original type.
 *
 * @template T - The original type from which properties will be omitted.
 * @template K - The keys of the properties to be omitted from the original type.
 *
 * @example
 * // Given a type of Person
 * type Person = {
 *   name: string;
 *   age: number;
 *   email: string;
 * };
 *
 * // Creating a new type without the email property
 * type PersonWithoutEmail = OmitProp<Person, 'email'>;
 * // Resulting type:
 * // {
 * //   name: string;
 * //   age: number;
 * // }
 *
 * @example
 * // Omitting multiple properties
 * type PersonWithoutContactInfo = OmitProp<Person, 'email' | 'age'>;
 * // Resulting type:
 * // {
 * //   name: string;
 * // }
 */
export type OmitProps<T, K extends PropertyKey> = { [P in keyof T as Exclude<P, K>]: T[P] };
