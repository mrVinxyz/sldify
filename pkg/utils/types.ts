import type { JSX } from 'solid-js';

/**
 * A utility type that extracts the value types of an object.
 * This type gets all possible values that could be held by any property in the object type.
 *
 * @template T - The object type from which to extract value types.
 *
 * @example
 * // With nested objects
 * type Config = {
 *   port: number;
 *   settings: {
 *     enabled: boolean;
 *     mode: 'dark' | 'light';
 *   }
 * };
 *
 * type ConfigValue = ValueOf<Config>; // Resulting type: number | { enabled: boolean; mode: 'dark' | 'light' }
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

/**
 * Represents a JSX Element. This is a type alias for JSX.Element,
 * which represents the return type of JSX expressions.
 *
 * @example
 * function createView(props: { children: View }): View {
 *   return <div>{props.children}</div>;
 * }
 */
export type View = JSX.Element;

/**
 * A type representing a component that requires children.
 *
 * @example
 * function Layout({ children }: ChildProp): View {
 *   return <main>{children}</main>;
 * }
 */
export type ChildProp = { children: View };

/**
 * A type representing a component that accepts an optional children.
 *
 * @example
 * function Container(props: OptChildProp): View {
 *   return <div>{props.children}</div>;
 * }
 */
export type OptChildProp = { children?: View };

/**
 * A type representing a component context.
 *
 * @template T - The type of the context value
 *
 * @example
 * type UserContext = { username: string; role: string };
 *
 * function UserProfile(props: ContextProp<UserContext>): View {
 *   const ctx = props.ctx;
 *   return <div>Welcome, {ctx.username}</div>;
 * }
 */
export type ContextProp<T> = { ctx: T };

/**
 * A type representing an optional component context.
 *
 * @template T - The type of the optional context value
 *
 * @example
 * type Theme = { color: string; mode: 'light' | 'dark' };
 *
 * function Panel({ ctx }: OptContextProp<Theme>): View {
 *   return <div style={{ background: ctx?.color }}>Content</div>;
 * }
 */
export type OptContextProp<T> = { ctx?: T };


/**
 * A type for components that receive a render function that takes context and returns a View.
 *
 * @template T - The type of context passed to the render function
 *
 * @example
 * type DataContext = { data: string[]; loading: boolean };
 *
 * function DataProvider(props: ChildrenCtxProp<DataContext>): View {
 *   const ctx = { data: ['item1', 'item2'], loading: false };
 *   return props.children(ctx);
 * }
 *
 * // Usage
 * <DataProvider>
 *   {(ctx) => <div>{ctx.loading ? 'Loading...' : ctx.data.join(', ')}</div>}
 * </DataProvider>
 */
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
