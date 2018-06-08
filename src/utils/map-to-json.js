/**
 * Converts a Map to a JSON-string representing an array, containing the values of the specified map.
 * @param {Map} map
 */
export function mapToJson(map)
{
    if (map instanceof Map)
    {
        return JSON.stringify(Array.from(map.values()))
    }
    else
    {
        return JSON.stringify([]);
    }
}
