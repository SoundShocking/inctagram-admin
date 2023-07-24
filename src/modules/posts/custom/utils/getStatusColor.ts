const statusColors: { [key: string]: string } = {
  PENDING: '#996600',
  ACTIVE: '#0F9954',
  BANNED: '#2F68CC',
  DELETED: '#8D9094',
}

export const getStatusColor = (status: string): string => statusColors[status] || ''
