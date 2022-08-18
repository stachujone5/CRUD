import Head from 'next/head'

export const ProductsPageContent = () => {
  const products = [
    {
      name: 'Wooden sword',
      category: 'Toy'
    },
    {
      name: 'Dog',
      category: 'Pet'
    },
    {
      name: 'Ball',
      category: 'Sport'
    },
    {
      name: 'Tennis Rocket',
      category: 'Sport'
    },
    {
      name: 'Dress',
      category: 'Clothing'
    },
    {
      name: 'Pizza',
      category: 'Food'
    },
    {
      name: 'Desk',
      category: 'Furniture'
    }
  ]
  return (
    <div className='text-center min-vh-100'>
      <Head>
        <title>Products</title>
      </Head>
      <h1 className='mb-5'>Products Page</h1>
      <div className='d-flex justify-content-center flex-wrap gap-4'>
        {products.map(p => (
          <div className='card' key={Math.random()}>
            <div className='card-body'>
              <h5 className='card-title'>{p.name}</h5>
              <p className='card-text'>{p.category}</p>
              <a href='#' className='btn btn-primary'>
                Edit product
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
