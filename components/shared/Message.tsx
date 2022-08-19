import clsx from 'clsx'

import type { Children } from '../../types'

interface Props extends Children {
  readonly className?: string
}

export const Message = ({ children, className }: Props) => {
  const classes = clsx('mb-5', className)

  return <h2 className={classes}>{children}</h2>
}
