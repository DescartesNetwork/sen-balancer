import { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs
const APP_ROUTE = `/app/${appId}`

export const useAppRouter = () => {
  const { search, pathname } = useLocation()
  const history = useHistory()

  const query = useMemo(() => {
    return new URLSearchParams(search)
  }, [search])

  const getQuery = useCallback((queryId: string) => query.get(queryId), [query])

  const getAllQuery = useCallback(<T>() => {
    const queries: Record<string, string> = {}
    query.forEach((value, key) => {
      queries[key] = value
    })
    const wrapResult: T = queries as any
    return wrapResult
  }, [query])

  const pushHistory = useCallback(
    (
      url: string,
      newQuery: Record<string, string> = {},
      force: boolean = true,
    ) => {
      const currentQuery = getAllQuery<Record<string, string>>()
      // Keep current query with 'force' === false
      if (force === false) newQuery = Object.assign(currentQuery, newQuery)
      const newParams = new URLSearchParams(newQuery)
      if (newParams) url += `?${newParams.toString()}`
      history.push(`${APP_ROUTE}${url}`)
    },
    [getAllQuery, history],
  )

  return { getQuery, getAllQuery, pushHistory, appRoute: APP_ROUTE, pathname }
}
