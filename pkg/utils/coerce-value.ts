function coerceValue<T>(value: string, type?: string): T {
    if (type === 'number') return Number.parseFloat(value) as T;
    return value as T;
}

export default coerceValue;