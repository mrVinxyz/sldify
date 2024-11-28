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
type ValueOf<T> = T[keyof T];

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
type PropsAttr = { [key: string]: unknown };

/**
 * Creates a deep partial type from an object type, allowing all nested properties to be optional.
 *
 * @template T - The object type to make deeply partial.
 *
 * @example
 * // Given a nested object
 * type User = {
 *   id: number;
 *   name: string;
 *   settings: {
 *     theme: 'light' | 'dark';
 *     notifications: {
 *       email: boolean;
 *       push: boolean;
 *     }
 *   }
 * };
 *
 * // All these are valid partial objects
 * const partialUser: ObjectPartial<User> = {
 *   id: 1,
 *   settings: {
 *     notifications: {
 *       email: true
 *     }
 *   }
 * };
 *
 * @remarks
 * - This type is particularly useful when dealing with configuration objects or form data
 *   where some nested properties might be omitted.
 * - It preserves the original types of non-object properties while making them optional.
 * - Arrays are treated as objects, so their elements become optional too.
 */
type ObjectPartial<T> = {
	[P in keyof T]: T[P] extends object ? ObjectPartial<T[P]> : T[P];
};

/**
 * Represents a JSX Element. This is a type alias for JSX.Element,
 * which represents the return type of JSX expressions.
 *
 * @example
 * function createView(props: { children: View }): View {
 *   return <div>{props.children}</div>;
 * }
 */
type View = JSX.Element;

/**
 * A type representing a component that requires children.
 *
 * @example
 * function Layout({ children }: ChildProp): View {
 *   return <main>{children}</main>;
 * }
 */
type ChildProp = { children: View };

/**
 * A type representing a component that accepts an optional children.
 *
 * @example
 * function Container(props: OptChildProp): View {
 *   return <div>{props.children}</div>;
 * }
 */
type OptChildProp = { children?: View };

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
type ContextProp<T> = { ctx: T };

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
type OptContextProp<T> = { ctx?: T };

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
type ChildContextProp<T> = {
	children: (ctx: T) => View;
};

/**
 * HTML attribute `class` mapped to the type of `HTMLElement['className']`.
 *
 * @example
 * const elementClass: ClassName = 'my-class';
 */
type ClassName = HTMLElement['className'];

/**
 * A type for components with optional class name attributes.
 *
 * @example
 * const myClassNames: ClassNames = { className: 'my-class' };
 */
type ClassesProp = {
	class?: ClassName;
};

export type {
	ValueOf,
	PropsAttr,
	ObjectPartial,
	View,
	ChildProp,
	OptChildProp,
	ContextProp,
	OptContextProp,
	ChildContextProp,
	ClassName,
	ClassesProp,
};
