import type { Options } from 'redaxios'
import axios from 'redaxios'

// @TODO: .env for URL
const request = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

export async function makeRequest<T>(url: string, options?: Options): Promise<T> {
  try {
    const { data } = await request.request(url, options)
    return data
  } catch (e: any) {
    return Promise.reject(e?.response?.data?.message ?? 'Something went wrong')
  }
}
