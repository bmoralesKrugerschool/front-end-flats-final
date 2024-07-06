import axios from 'axios';

const Api = 'http://localhost:3006/api/v1/user/';

export const register = async (data) => {
  console.log('data:', data);
  data.status = true
  try {
    const response = await axios.post(`${Api}register`, data);
    console.log('response:', response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const login = async (data) => {
  console.log('data:', data);
  data.status = true
  try {
    const response = await axios.post(`${Api}login`, data);
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const logout = async (data) => {
  data.status = true
  try {
    const response = await axios.post(`${Api}logout`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}