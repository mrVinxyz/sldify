function generateId(prefix: string) {
	return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}

export default generateId;
