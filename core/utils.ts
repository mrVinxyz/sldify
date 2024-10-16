/**
 * Generates a random base36 hash. The default size is 10.
 *
 * @example
 * const randomId = generateRandomId();
 * console.log(randomId); // '_1a2b3c4d'
 */
export function randomHash(size = 10): string {
	return '_'.concat(
		Math.random()
			.toString(36)
			.substring(2, size),
	);
}
