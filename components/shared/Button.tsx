import clsx from 'clsx'

import type { ButtonHTMLAttributes } from 'react'

export const Button = ({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = clsx('btn btn-primary', className)

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
