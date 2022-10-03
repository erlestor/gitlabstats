export function stripObject<T>(object: T, propertiesToKeep: (keyof T)[]): T {
    return propertiesToKeep.reduce<T>((acc, cur) => {
        acc[cur] = object[cur]
        return acc
    }, {} as T)
}