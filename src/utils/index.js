export function formatDate(dateString) {
  const date = new Date(dateString);

  // Get the date, hours, and minutes
  const formattedDate = date.toLocaleDateString();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM notation
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Format the time to have leading zeros if necessary
  const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  // Combine the date, time, and AM/PM notation
  const formattedDateTime = `${formattedDate} ${formattedTime} ${amOrPm}`;

  return formattedDateTime;
}
