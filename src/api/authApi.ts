import axios from "axios";

export async function getUser(userId : string) {
  try {
    const response = await axios({
      method: 'GET',
      url :`${import.meta.env.VITE_API_BASE_URL}/auth/user/${userId}`,
    })
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred while fetching user';
    throw new Error(errorMessage);
  }
}

export async function grantToken(token: string) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/protected`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    })
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function loginUser({ email, password }: { email: string, password: string }) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      data: {
        email,
        password
      }
    })
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function registerUser(formData: any) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function upgradeUserProfile(formData: any, token : string) {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/upgrade`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function sendVerificationMail(token : string) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/verifymail`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    })
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function sendContactMail({ name, email, message }: { name: string, email: string, message : string }) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/contact`,
      data: {
        name,
        email,
        message
      }
    })
    return response.data.data
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}