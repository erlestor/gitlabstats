import axios from "axios";


const token = "glpat-gG3CkJFYeo4nVrLmcDRa"; // gitlab access token. Add your own token here temporary
const baselineUrl = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/";

//First get all members function
export const getAllMembers = async (id: number) => {

  var dataList:string[] = [] 

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
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    });
};



//Get commits sorted on given dates
//Have to pass in undefined for startdate to get correct enddate
export const getCommits = async (projectId: number, startDate?: string, endDate?: string): Promise<any[]> => {
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
        console.log(response.data);
      if (response.status === 200) {
        const data = response.data;
        
        console.log(response.status);
        return response.data;
      }
      return null;
    });
};

export const getIssuesAutheredBy = async (projectId: number, userId: number, afterDate?: string): Promise<any[]> => {

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
        console.log(response.data);
        return response.data;
      }
      return null;
    }
  );
};

export const getIssueStats = async (projectId: number): Promise<any[]> => {
  return await axios.get(baselineUrl + `${projectId}/issues_statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log(response.status)
    if (response.status === 2000) {
      console.log(response.data);
      return response.data;
    }
    return null;
  });
}


//export const getNumberOfChangesByUser = async (projectId: number, )



//This does not work and I dont understand why
/*export const getAllCommitsOfUser = async (projectId: number, userId: number): Promise<any[]> => {
  return await axios.get(baselineUrl + `${projectId}/repository/commits`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //filter the commits by the user id
      if (response.status === 200) {
        return response.data.filter((commit: any) => commit.author_id === userId);
      }
      return null;
    });
}*/

