/**
 * @param {Map} map1
 * @param {Map} map2
 * @return {Map}
 */
export function mapConcatImmutable(map1, map2)
{
    /** @type {Map} */
    const newMap = new Map(map1.entries());

    map2.forEach((value, key) =>
    {
        newMap.set(key, value);
    });

    return newMap;
}

/**
 * @param {Map} map
 * @param key
 * @param value
 */
export function mapSetImmutable(map, key, value)
{
    /** @type {Map} */
    const newMap = new Map(map.entries());

    newMap.set(key, value);

    return newMap;
}

/**
 * @param {Map} map
 * @param key
 */
export function mapDeleteImmutable(map, key)
{
    /** @type {Map} */
    const newMap = new Map(map.entries());

    newMap.delete(key);

    return newMap;
}

/**
 * @param {Map} map
 * @param {(value, key, map) => boolean} callback
 */
export function mapFilterImmutable(map, callback)
{
    /** @type {Map} */
    const newMap = new Map();

    map.forEach((value, key) =>
    {
        if (callback(value, key, map))
        {
            newMap.set(key, value);
        }
    });

    return newMap;
}
