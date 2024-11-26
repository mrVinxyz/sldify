type ClassValue = string | false | null | undefined | Record<string, boolean> | ClassValue[];

const cn = (...args: ClassValue[]): string => {
	const classes: string[] = [];

	const handleArg = (arg: ClassValue) => {
		if (!arg) return;

		if (Array.isArray(arg)) {
			arg.forEach(handleArg);
		} else if (typeof arg === 'string') {
			classes.push(arg);
		} else if (typeof arg === 'object') {
			for (const key in arg) {
				if (arg[key]) {
					classes.push(key);
				}
			}
		}
	};

	args.forEach(handleArg);
	return classes.join(' ');
};

export default cn;