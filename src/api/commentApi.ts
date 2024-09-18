import axios from "axios";

interface commentInterface {
  content : string,
  parentId ?: string
}

export async function postComment(ideaId: string, token: string, comment : commentInterface) {

  try {
    const response = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_API_BASE_URL}/comments/${ideaId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: comment,
    });
    return response.data.data;
  } catch (err: any) {
    console.log(err)
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function getComments(ideaId: string) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/comments/${ideaId}`)
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}