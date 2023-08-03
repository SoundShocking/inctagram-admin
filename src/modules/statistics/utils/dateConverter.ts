export const dateConverter = async (date: Date[]) => {
  return date.map((item: any) => {
    const formatedDate = new Date(item)

    return formatedDate.getDate()
  })
}
