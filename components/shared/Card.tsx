import Link from 'next/link'

interface Props {
  readonly btn?: boolean
  readonly btnText?: string
  readonly header: string
  readonly href: string
  readonly text?: string
}

export const Card = ({ btn, btnText, header, href, text }: Props) => {
  console.log(href)
  return (
    <Link href={href}>
      <a className='card btn'>
        <div className='card-body'>
          <h5 className='card-title'>{header}</h5>
          {text && <p className='card-text'>{text}</p>}
          {btn && <button className='btn btn-primary'>{btnText}</button>}
        </div>
      </a>
    </Link>
  )
}
