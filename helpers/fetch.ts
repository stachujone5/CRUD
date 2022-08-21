import axios from 'axios'

export const customFetch = async <ResponseData>(path: string) => {
  try {
    const res = await axios.get<ResponseData>(path)
    return res.data
  } catch (err) {
    throw new Error('Failed to fetch')
  }
}
