import axios from 'axios';




const token = "token"; // gitlab access token. Add your own token here

//First get all members function
export const getAllMembers = async (id: number) => {
    const response = await axios.get(`https://gitlab.idi.ntnu.no/api/v4/groups/${id}/members?private_token=${token}`);
    return response.data;
}




