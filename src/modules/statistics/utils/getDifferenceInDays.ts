export function getDifferenceInDays(startDateStr: Date, endDateStr: Date) {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  // Calculate the difference between end date and start date in milliseconds
  //@ts-ignore
  const differenceInMs = endDate - startDate

  // Convert the difference to days
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24)

  return differenceInDays
}
