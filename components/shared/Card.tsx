interface Props {
  readonly btn?: boolean
  readonly btnText?: string
  readonly header: string
  readonly text?: string
}

export const Card = ({ btn, btnText, header, text }: Props) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{header}</h5>
        {text && <p className='card-text'>{text}</p>}
        {btn && <button className='btn btn-primary'>{btnText}</button>}
      </div>
    </div>
  )
}
