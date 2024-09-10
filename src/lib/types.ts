import type { JSX } from 'solid-js';

/** Represents a component. */
export type Element = JSX.Element;

/**
 * Typealias for classnames html interface.
 */
export type ClassName = HTMLElement['className'];

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
