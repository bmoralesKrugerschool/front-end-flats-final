import axios from 'axios';

const Api = 'http://localhost:3006/api/v1/user/';

export const register = async (data) => {
    data.status = true
    try {
    const response = await axios.post(`${Api}register`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}