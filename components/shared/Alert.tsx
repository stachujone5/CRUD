import clsx from 'clsx'

import type { Children } from '../../types'

interface Props extends Children {
  readonly className?: string
  readonly variant?: 'success' | 'danger'
}

export const Alert = ({ children, className, variant = 'success' }: Props) => {
  const classes = clsx(
    'alert',
    variant === 'success' && 'alert-success',
    variant === 'danger' && 'alert-danger',
    className
  )

  return (
    <div className={classes} role='alert'>
      {children}
    </div>
  )
}
