export function formatDate(dateTimeString) {
  if (dateTimeString) {
    const originalDate = new Date(dateTimeString)

    // Set the desired time (9:00 am)
    originalDate.setUTCHours(9)
    originalDate.setUTCMinutes(0)

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }

    const dateFormatter = new Intl.DateTimeFormat('en-US', options)

    return dateFormatter.format(originalDate)
  }
}
