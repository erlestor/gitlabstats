import axios from "axios";

const token = "glpat-gG3CkJFYeo4nVrLmcDRa"; // gitlab access token. Add your own token here

//First get all members function
export const getAllMembers = async (id: number): Promise<any[]> => {
  return await axios
    .get(
      `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${id}/members/all`,
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
