import Link from 'next/link'

interface Props {
  readonly header: string
  readonly href: string
  readonly text?: string
}

export const Card = ({ header, href, text }: Props) => {
  return (
    <Link href={href}>
      <a className='card btn'>
        <div className='card-body'>
          <h5 className='card-title'>{header}</h5>
          {text && <p className='card-text'>{text}</p>}
        </div>
      </a>
    </Link>
  )
}
