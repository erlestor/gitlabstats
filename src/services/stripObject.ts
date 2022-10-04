/* Method to support gitlabService.
* It is used to filter out the data we want from the API calls.
* Parameters: object to strip and the properties of this object to keep.
* Output: The stripped data. 
*/
export function stripObject<T>(object: T, propertiesToKeep: (keyof T)[]): T {
    return propertiesToKeep.reduce<T>((acc, cur) => {
        acc[cur] = object[cur]
        return acc
    }, {} as T)
}