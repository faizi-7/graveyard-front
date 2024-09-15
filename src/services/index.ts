export function timeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = Math.floor((now.getTime() - time.getTime()) / 1000); // Difference in seconds

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInYear = secondsInDay * 365;

  if (diff < secondsInMinute) {
    return `${diff} seconds ago`;
  } else if (diff < secondsInHour) {
    const minutes = Math.floor(diff / secondsInMinute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diff < secondsInDay) {
    const hours = Math.floor(diff / secondsInHour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diff < secondsInYear) {
    const days = Math.floor(diff / secondsInDay);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diff / secondsInYear);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}
