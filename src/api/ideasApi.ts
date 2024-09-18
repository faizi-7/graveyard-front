import axios from 'axios';

export async function getAllIdeas({ pageParam = 0, sortBy, tags, isOriginal }: { pageParam?: number, sortBy?: string, tags?: string, isOriginal?: boolean }) {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append('cursor', pageParam.toString());
    if (sortBy) queryParams.append('sortBy', sortBy);
    if (tags) queryParams.append('tags', tags);
    if (isOriginal !== undefined) queryParams.append('isOriginal', isOriginal.toString());

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ideas?${queryParams.toString()}`);

    return {
      data: response.data.data.ideas,
      nextCursor: response.data.data.nextCursor
    };
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function getTopIdeas() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ideas/top`)
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
export async function getSingleIdea(ideaId: string) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ideas/${ideaId}`)
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
export async function getIdeasByUser(userId: string) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ideas/user/${userId}`)
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function createIdea(ideaBody: FormData, token: string) {

  try {
    const response = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_API_BASE_URL}/ideas`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: ideaBody,
    });
    return response.data.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
export async function getTags() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ideas/tags`)
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function voteIdea(token: string, vote: string, ideaId: string) {
  try {
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/ideas/${ideaId}/vote`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { vote : vote }
    })
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}


export async function addIdeaToFavorite(token: string, ideaId: string) {
  try {
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/ideas/favorites/${ideaId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function updateIdea(ideaId: string, ideaBody: FormData, token: string) {

  try {
    const response = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_API_BASE_URL}/ideas/${ideaId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: ideaBody,
    });
    return response.data.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}