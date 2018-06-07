/**
 * Converts a timestamp (milliseconds since epoch) to a `YYYY-MM-DDThh:mm` formatted string to be used by `input[type=datetime]`.
 * @param {number} timestamp Milliseconds since the epoch (e.g. the return value of a `Date.now()` call).
 */
export function timestampToDateString(timestamp)
{
    let date = new Date();

    if (timestamp > Date.now())
    {
        date = new Date(timestamp);
    }

    // Yes, input[type=datetime] requires a YYYY-MM-DDThh:mm formatting, for which there is no native solution. How cool is that!
    let yearString = date.getFullYear().toString().padStart(4, "0");
    let monthString = (date.getMonth() + 1).toString().padStart(2, "0"); // Remember, months start from 0 and go to 11.
    let dayString = date.getDate().toString().padStart(2, "0");
    let hourString = date.getHours().toString().padStart(2, "0");
    let minuteString = date.getMinutes().toString().padStart(2, "0");

    let dateString = `${yearString}-${monthString}-${dayString}T${hourString}:${minuteString}`;

    return dateString;
}
