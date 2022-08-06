import { createEffect, createSignal } from 'solid-js'

export function useAsync<T> (asyncFn: (...params: unknown[]) => Promise<T>) {
  const { execute, ...state } = useAsyncInternal<T>(asyncFn, true)
  createEffect(() => {
    execute()
  })

  return state
}

export function useAsyncFn<T> (asyncFn: (...params: unknown[]) => Promise<T>) {
  return useAsyncInternal<T>(asyncFn)
}

function useAsyncInternal<T> (asyncFn: (...params: unknown[]) => Promise<T>, initialLoading: boolean = false) {
  const [loading, setLoading] = createSignal<boolean>(initialLoading)
  const [error, setError] = createSignal<string>()
  const [value, setValue] = createSignal<T | undefined>(undefined)

  const execute = async (...params: unknown[]) => {
    setLoading(true)
    try {
      const data = await asyncFn(...params)
      setValue(() => data)
      setError(undefined)
      return data
    } catch (error: any) {
      setValue(undefined)
      setError(() => error)
      return Promise.reject(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, value, execute }
}
