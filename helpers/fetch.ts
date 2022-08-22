import axios from 'axios'

export const customFetch = async <ResponseData>(path: string) => {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!

  try {
    const res = await axios.get<ResponseData>(path, { headers: { Authorization: authorization } })
    return res.data
  } catch (err) {
    throw new Error('Failed to fetch')
  }
}
