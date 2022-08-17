export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='py-3 my-4 border-top text-center bg-dark'>
      <span className='mb-3 mb-md-0 text-white'>© {year} GoPOS, Inc</span>
    </footer>
  )
}
