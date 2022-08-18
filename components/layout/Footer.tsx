export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='py-3 border-top text-center bg-light'>
      <span className='mb-3 mb-md-0'>© {year} GoPOS, Inc</span>
    </footer>
  )
}
