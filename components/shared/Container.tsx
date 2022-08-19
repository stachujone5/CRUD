import clsx from 'clsx'

import type { Children } from '../../types'

interface Props extends Children {
  readonly className?: string
}

export const Container = ({ children, className }: Props) => {
  const classes = clsx('text-center min-vh-100', className)

  return <div className={classes}>{children}</div>
}
