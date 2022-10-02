import {} from "./services/gitlabService"
import { FilterOptions } from "./stats-page/IFilterOptions"

export interface RepoInformation {
  token: string
  projectId: number
}

let repoInformation: RepoInformation | null = null

const getLocalStorageToken = (): string | null => {
  return localStorage.getItem("token")
}

const getLocalStorageProjectId = (): number | null => {
  const v = localStorage.getItem("projectId")
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
  localStorage.setItem("token", r.token)
  localStorage.setItem("projectId", r.projectId.toString())
}

export const saveFilterInformation = (filterOptions: FilterOptions) => {
  window.sessionStorage.setItem("filterOptions", JSON.stringify(filterOptions))
}

export const getFilterInformation = () => {
  const sessionStorage = window.sessionStorage.getItem("filterOptions")

  if (sessionStorage) return JSON.parse(sessionStorage)
  return null
}
