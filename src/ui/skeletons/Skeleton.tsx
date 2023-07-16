import { FC } from 'react'

import { clsx } from 'clsx'

export const Skeleton: FC<{ classes?: any }> = ({ classes }) => {
  const classNames = clsx(classes, 'bg-dark-300 dark:bg-dark-500 animate-pulse')

  return <div style={{ width: '100%', height: '100%' }} className={classNames}></div>
}
