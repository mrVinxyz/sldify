/**
 * Generates a random base36 hash. The default size is 10.
 *
 * @example
 * const randomId = generateRandomId();
 * console.log(dropdownId); // '_1a2b3c4d'
 */
export function randomHash(size?: number): string {
	return '_'.concat(
		Math.random()
			.toString(36)
			.substring(2, size || 10),
	);
}
