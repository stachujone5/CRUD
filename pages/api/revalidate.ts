import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  try {
    await res.revalidate('/products')
    await res.revalidate('/categories')
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

export default handler
