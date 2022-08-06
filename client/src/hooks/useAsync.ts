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
  const [error, setError] = createSignal<Error>()
  const [value, setValue] = createSignal<T |undefined>()

  const execute = (...params: unknown[]) => {
    setLoading(true)
    return asyncFn(...params).then(value => {
      // @ts-ignore
      setValue(value)
      setError(undefined)
      return value
    }).catch(error => {
      setValue(undefined)
      setError(error)
      return Promise.reject(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  return { loading, error, value, execute }
}
