import Head from 'next/head'

export const HomePageContent = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center min-vh-100'>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home page</h1>
    </div>
  )
}
