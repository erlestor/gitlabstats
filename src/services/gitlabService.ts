import axios from "axios";
import { stripObject } from "./stripObject";


const token = "glpat-gG3CkJFYeo4nVrLmcDRa"; // gitlab access token. Add your own token here temporary
const baselineUrl = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/";


interface Commit {
  created_at: String
  author_name: String
}

interface Issue {
  created_at: String
  author: {
    username: string,
    name: string
  }
}

interface Member {
  id: number,
  username: string,
  name: string,
}


//First get all members function
export const getAllMembers = async (id: number): Promise<Member[]> => {
  
  return await axios
    .get(
      baselineUrl + `${id}/members/all`,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return (response.data as Member[]).map((e) => {
          const data = stripObject<Member>(e, ["id", "username", "name"])
          console.log(data)
          return data
        }
        )
      }
      throw Error("failed to fetch data")
      
    });
};

const dataToGraphCommits = (data: any) => {
  let users = data.map((commit: Commit) => commit.author_name)
  users = new Set(users)
  users = [... users]
  // users are now all the unique author names that have commited

  const graphCommits: any = []
  users.forEach((user: any) => {
    // get commits for a single user
    const commits = data.filter((commit: Commit) => commit.author_name === user)
    // sort by date ascending
    commits.sort((c1: any, c2: any) => new Date(c1.created_at).getTime() - new Date(c2.created_at).getTime())
    console.log(commits)
    
    const commitData: any = [] // {authorName, date, numberOfCommits}

    // now count the number of commits on each date in commits
    commits.forEach((commit: Commit) => {
      const date = commit.created_at.substring(0, 10)
      // if date is already added
      const commitsAtDate = commitData.filter((c: any) => 
         new Date(commit.created_at.substring(0, 10)).getTime() === new Date(c.date).getTime()
      )
      if (commitsAtDate.length > 0) {
        commitsAtDate[0].numberOfCommits += 1
      } else {
        commitData.push({authorName: user, date: date, numberOfCommits: 1})
      }
    })
    graphCommits.push(commitData)
  })
  console.log(graphCommits)
}



//Get commits sorted on given dates
//Have to pass in undefined for startdate to get correct enddate
export const getCommits = async (projectId: number, startDate?: string, endDate?: string): Promise<Commit[]> => {
  let url = baselineUrl + `${projectId}/repository/commits`
  
  if(startDate && endDate) {
    url = url + `?since=${startDate}&until=${endDate}`;
  }
  if (startDate && !endDate) {
    url = url + `?since=${startDate}`;
  }
  if (!startDate && endDate) {
    url = url + `?until=${endDate}`;
  }
 

  
  return await axios.get(url, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;
        data = data.map((commit: Commit) => {
          const {created_at, author_name} = commit
          return {
            created_at,
            author_name
          }
        })
        dataToGraphCommits(data)
        return data as Commit[];
      }
      throw Error("Could not fetch the commit data")
    });
};


export const getIssuesAutheredBy = async (projectId: number, userId: number, afterDate?: string): Promise<Issue[]> => {

  let url = baselineUrl + `${projectId}/issues?author_id=${userId}`

  if(afterDate) {
    url = url + `&created_after=${afterDate}`;
  }
  
 
  return await axios.get(url, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {  
          return (response.data as Issue[]).map((e) => { 
            e.author = stripObject(e.author, ["name", "username"])
            const data =  stripObject<Issue>(e, ["author", "created_at"]);
            console.log(data)
            return data
          })
        
      }
      throw Error("failed to fetch")
    }
  );
};

