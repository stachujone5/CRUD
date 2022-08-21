import clsx from 'clsx'
import Link from 'next/link'

import { INDEX_PATH } from '../../constants/paths'

import type { Children } from '../../types'

interface Props extends Children {
  readonly className?: string
  readonly href?: string
}

export const LinkButton = ({ children, className, href = INDEX_PATH }: Props) => {
  const classes = clsx('btn btn-primary p-3', className)

  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  )
}
