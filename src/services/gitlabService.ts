import axios from "axios";
import { getRepoInformation, RepoInformation } from "../authentication/getRepoInformation";
import { stripObject } from "./stripObject";

const baselineUrl = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/";

export interface Commit {
  created_at: string;
  author_name: string;
}

export interface Issue {
  created_at: string;
  author: {
    username: string;
    name: string;
  };
}

export interface Member {
  id: number;
  username: string;
  name: string;
}

//First get all members function
export const getAllMembers = async (id: number): Promise<Member[]> => {
  return axios
    .get(baselineUrl + `${id}/members/all`, {
      headers: {
        Authorization: `Bearer ${getRepoInformation().token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return (response.data as Member[]).map((e) => {
          const data = stripObject<Member>(e, ["id", "username", "name"]);
          return data;
        });
      }
      throw Error("failed to fetch data");
    });
};

const dataToGraphCommits = (data: any) => {
  let users = data.map((commit: Commit) => commit.author_name);
  users = new Set(users);
  users = [...users];
  // users are now all the unique author names that have commited

  const graphCommits: any = [];
  users.forEach((user: any) => {
    // get commits for a single user
    const commits = data.filter(
      (commit: Commit) => commit.author_name === user
    );
    // sort by date ascending
    commits.sort(
      (c1: any, c2: any) =>
        new Date(c1.created_at).getTime() - new Date(c2.created_at).getTime()
    );

    const commitData: any = []; // {authorName, date, numberOfCommits}

    // now count the number of commits on each date in commits
    commits.forEach((commit: Commit) => {
      const date = commit.created_at.substring(0, 10);
      // if date is already added
      const commitsAtDate = commitData.filter(
        (c: any) =>
          new Date(commit.created_at.substring(0, 10)).getTime() ===
          new Date(c.date).getTime()
      );
      if (commitsAtDate.length > 0) {
        commitsAtDate[0].numberOfCommits += 1;
      } else {
        commitData.push({ authorName: user, date: date, numberOfCommits: 1 });
      }
    });
    graphCommits.push(commitData);
  });

  return graphCommits;
};

//Get commits sorted on given dates
//Have to pass in undefined for startdate to get correct enddate
export const getCommits = async (
  projectId: number,
  startDate?: string,
  endDate?: string
): Promise<Commit[]> => {
  let url = baselineUrl + `${projectId}/repository/commits?per_page=9999`;

  if (startDate && endDate) {
    url = url + `&since=${startDate}&until=${endDate}`;
  }
  if (startDate && !endDate) {
    url = url + `&since=${startDate}`;
  }
  if (!startDate && endDate) {
    url = url + `&until=${endDate}`;
  }

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getRepoInformation().token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;
        data = data.map((commit: Commit) => {
          const { created_at, author_name } = commit;
          return {
            created_at,
            author_name,
          };
        });
        const graphData = dataToGraphCommits(data);
        return graphData as Commit[];
      }
      throw Error("Could not fetch the commit data");
    });
};

const dataToGraphIssues = (data: any) => {
  let users = data.map((issue: Issue) => issue.author.name);
  users = new Set(users);
  users = [...users];
  // users are now all the unique author names that have created an issue

  const graphIssues: any = [];
  users.forEach((user: any) => {
    // get commits for a single user
    const issues = data.filter((issue: Issue) => issue.author.name === user);
    // sort by date ascending
    issues.sort(
      (i1: any, i2: any) =>
        new Date(i1.created_at).getTime() - new Date(i2.created_at).getTime()
    );

    const issueData: any = []; // {authorName, date, numberOfCommits}

    // now count the number of commits on each date in commits
    issues.forEach((issue: Issue) => {
      const date = issue.created_at.substring(0, 10);
      // if date is already added
      const issuesAtDate = issueData.filter(
        (i: any) =>
          new Date(issue.created_at.substring(0, 10)).getTime() ===
          new Date(i.date).getTime()
      );
      if (issuesAtDate.length > 0) {
        issuesAtDate[0].numberOfIssues += 1;
      } else {
        issueData.push({ authorName: user, date: date, numberOfIssues: 1 });
      }
    });
    graphIssues.push(issueData);
  });

  return graphIssues;
};

export const getIssues = async (
  projectId: number,
  afterDate?: string
): Promise<Issue[]> => {
  let url = baselineUrl + `${projectId}/issues?per_page=9999`;

  if (afterDate) {
    url = url + `&created_after=${afterDate}`;
  }

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getRepoInformation().token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = (response.data as Issue[]).map((e) => {
          e.author = stripObject(e.author, ["name", "username"]);
          const data = stripObject<Issue>(e, ["author", "created_at"]);
          return data;
        });
        const graphData = dataToGraphIssues(data);
        return graphData;
      }
      throw Error("failed to fetch");
    });
};

export const validateRepoInformation = async (
  repoInformation: RepoInformation
): Promise<boolean> => {
  if (!repoInformation.projectId || !repoInformation.token)
    throw Error("No repo information");
  const { token, projectId } = repoInformation;
  const url = baselineUrl + `${projectId}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        if (data) return true;
      }
      throw Error("failed to fetch");
    });
};
