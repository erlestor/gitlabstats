import {} from "./services/gitlabService";

export interface RepoInformation {
  token: string;
  projectId: string;
}

let repoInformation: RepoInformation | null = null;

const getLocalStorageToken = () => {
  return localStorage.getItem("token");
};

const getLocalStorageProjectId = () => {
  return localStorage.getItem("projectId");
};

export const getRepoInformation = (): RepoInformation | null => {
  if (repoInformation) {
    return repoInformation;
  }
  if (getLocalStorageToken() && getLocalStorageProjectId()) {
    repoInformation = {
      token: getLocalStorageToken()!,
      projectId: getLocalStorageProjectId()!,
    };
    return repoInformation;
  } else {
    return null;
    /*show login page*/
  }
};

export const setRepoInformation = (token: string, projectId: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("projectId", projectId);
};
