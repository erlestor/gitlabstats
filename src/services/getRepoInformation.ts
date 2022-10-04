import { FilterOptions } from "../components/stats-page/IFilterOptions"

export interface RepoInformation {
  token: string
  projectId: number
}

let repoInformation: RepoInformation | null = null
const tokenKey = "token"
const projectIdKey = "projectId"
const filterOptionsKey = "filterOptions"

const getLocalStorageToken = (): string | null => {
  return localStorage.getItem(tokenKey)
}

const getLocalStorageProjectId = (): number | null => {
  const v = localStorage.getItem(projectIdKey)
  if (!v) {
    return null
  }
  return parseInt(v)
}

export const hasRepoInformation = (): boolean => {
  return (
    !!repoInformation ||
    (!!getLocalStorageToken() && !!getLocalStorageProjectId())
  )
}

export const getRepoInformation = (): RepoInformation => {
  if (repoInformation) {
    return repoInformation
  }
  if (getLocalStorageToken() && getLocalStorageProjectId()) {
    repoInformation = {
      token: getLocalStorageToken()!,
      projectId: getLocalStorageProjectId()!,
    }
    return repoInformation
  }
  throw new Error("No repo information found")
}

export const saveRepoInformation = (r: RepoInformation) => {
  repoInformation = r
  localStorage.setItem(tokenKey, r.token)
  localStorage.setItem(projectIdKey, r.projectId.toString())
}

export const saveFilterInformation = (filterOptions: FilterOptions) => {
  window.sessionStorage.setItem(filterOptionsKey, JSON.stringify(filterOptions))
}

export const getFilterInformation = () => {
  const savedFilterOptionJson = window.sessionStorage.getItem(filterOptionsKey)
  if (savedFilterOptionJson) return JSON.parse(savedFilterOptionJson)
  return null
}
