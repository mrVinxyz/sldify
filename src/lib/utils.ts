/**
 * Generates a random base36 hash. The default size is 10.
 *
 * @example
 * const randomId = generateRandomId();
 * console.log(randomId); // '_1a2b3c4d'
 */
export function randomHash(size?: number): string {
	return '_'.concat(
		Math.random()
			.toString(36)
			.substring(2, size || 10),
	);
}

/**
 * Determines the grid column span size based on the given value.
 *
 * @param value - The value indicating the desired column span size.
 * @returns The CSS class representing the corresponding column span size.
 */
export function gridColsSpanSize(value: string): string {
	const match = (value: string) => {
		switch (value) {
			case 'xs':
				return 'col-span-2';
			case 'sm':
				return 'col-span-4';
			case 'md':
				return 'col-span-6';
			case 'lg':
				return 'col-span-8';
			case 'xl':
				return 'col-span-10';
			case 'full':
				return 'col-span-12';
			default:
				return 'w-full';
		}
	};

	return match(value);
}
