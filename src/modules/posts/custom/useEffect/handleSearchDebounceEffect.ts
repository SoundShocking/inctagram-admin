import { useEffect } from 'react'

export const handleSearchDebounceEffect = ({
  timerId,
  search,
  loading,
  setDebounce,
  setTimerId,
}: {
  timerId: NodeJS.Timeout | undefined
  search: string
  loading: boolean
  setDebounce: (search: string) => void
  setTimerId: (value: NodeJS.Timeout) => void
}) => {
  useEffect(() => {
    clearTimeout(timerId)

    if (!loading) {
      setTimerId(
        setTimeout(() => {
          setDebounce(search)
        }, 1000)
      )
    }
  }, [search])
}
