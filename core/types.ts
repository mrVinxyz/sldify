import type { JSX } from 'solid-js';

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
 * const myComponent: Child = {
 *   children: <div>Child content</div>
 * };
 */
export type Child = { children: View };

/**
 * A type for components with optional children.
 *
 * @example
 * const myComponent: OptChild = {};
 */
export type OptChild = { children?: View };

/**
 * A type representing a component context with a generic type.
 *
 * @template T - The type of the context.
 *
 * @example
 * const ctxComponent: ComponentCtx<{ user: string }> = { ctx: { user: 'John' } };
 */
export type ComponentCtx<T> = { ctx: T };

/**
 * A type for components with optional context.
 *
 * @template T - The type of the optional context.
 *
 * @example
 * const ctxComponent: OptComponentCtx<{ user: string }> = {};
 */
export type OptComponentCtx<T> = { ctx?: T };

/**
 * A type representing a component that renders children using a provided context.
 *
 * @template T - The type of the context.
 *
 * @example
 * const myComponent: ChildCtxComponent<{ user: string }> = {
 *   children: (ctx) => <div>{ctx.ctx.user}</div>
 * };
 */
export type ChildCtxComponent<T> = { children: (ctx: ComponentCtx<T>) => View };

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
export type ClassNames = {
	className?: ClassName;
};

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
export type PropAttr = { [key: string]: unknown };

/**
 * `RangeSize` generates a union of numbers within a specified range `[Start, End)`.
 *
 * @template Start - The starting number of the range (inclusive).
 * @template End - The ending number of the range (exclusive).
 * @template Result - Used internally to build the range. Defaults to an empty array.
 *
 * @example
 * // Resulting type: 2 | 3 | 4 | 5 | 6
 * type Example = RangeSize<2, 6>;
 */
export type RangeSize<
	Start extends number,
	End extends number,
	Result extends Array<unknown> = [],
> = Result['length'] extends End
	? [...Result, Result['length']][number] extends Start | infer U
		? U
		: never
	: RangeSize<Start, End, [...Result, Result['length']]>;

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
export type OmitProp<T, K extends PropertyKey> = { [P in keyof T as Exclude<P, K>]: T[P] };
