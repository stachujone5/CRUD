import clsx from 'clsx'
import Link from 'next/link'

import { INDEX_PATH } from '../../constants/paths'

import type { AnchorHTMLAttributes } from 'react'

export const LinkButton = ({ children, className, href = INDEX_PATH }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const classes = clsx('btn btn-primary p-3', className)

  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  )
}
