import axios from "axios";


const token = ""; // gitlab access token. Add your own token here temporary
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
        console.log(response.status);
        return response.data;
      }
      return null;
    });
};



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

