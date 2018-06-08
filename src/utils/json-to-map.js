/**
 * Converts a JSON-string representing an array to a map.
 * @param {string} jsonString
 * @param {Function} keyCallback
 */
export function jsonToMap(jsonString, keyCallback)
{
    let array = JSON.parse(jsonString);

    if (array instanceof Array)
    {
        let map = new Map();

        for (let item of array)
        {
            map.set(keyCallback(item), item);
        }

        return map;
    }

    return new Map();
}
