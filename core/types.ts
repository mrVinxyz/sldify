import type { JSX } from 'solid-js';

export type View = JSX.Element;

export type Child = { children: View };

export type OptChild = { children?: View };

export type ComponentCtx<T> = { ctx: T };

export type OptComponentCtx<T> = { ctx?: T };

export type ChildCtxComponent<T> = { children: (ctx: ComponentCtx<T>) => View };

/**
 * HTML attribute `class`.
 *
 * @example
 *
 * // Applying a class to an HTML element, this adds intellisense.
 * const elementClass: ClassName = 'my-class';
 */
export type ClassName = HTMLElement['className'];

export type ClassNames = {
	className?: ClassName;
};

/**
 * Any HTML attribute
 *
 * @example
 * const myProps: PropAttr = {
 *   id: 'button1',
 *   disabled: true,
 *   'aria-label': 'Submit Button'
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
