export function formatDate(dateTimeString) {
  if (dateTimeString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }

    const dateFormatter = new Intl.DateTimeFormat('en-US', options)

    const originalDate = new Date(dateTimeString)
    const formattedDate = dateFormatter.format(originalDate)

    return formattedDate
  }
}
