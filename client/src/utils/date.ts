export const dateFormatter = (date: string) => {
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  return formatter.format(Date.parse(date))
}
