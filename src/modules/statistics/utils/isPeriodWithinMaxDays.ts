import { getDifferenceInDays } from '@/modules/statistics/utils/getDifferenceInDays'

export function isPeriodWithinMaxDays(startDate: Date, endDate: Date, max: number) {
  const differenceInDays = getDifferenceInDays(startDate, endDate)

  // Check if the period is not more than max days
  return differenceInDays <= max
}
