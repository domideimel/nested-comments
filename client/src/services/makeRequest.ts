import type { Options } from 'redaxios'
import axios from 'redaxios'

const request = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
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
