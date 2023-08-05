export function getDateDaysAgo(days: number): Date {
  const currentDate = new Date()
  let thirtyDaysAgo: Date = new Date()

  thirtyDaysAgo.setDate(currentDate.getDate() - days)

  return thirtyDaysAgo
}
