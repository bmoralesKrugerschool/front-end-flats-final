import axios from 'axios';
const Api = 'http://localhost:3006/api/v1/flats/';

export const getFlats = async () => {
  try {
    const response = await axios.get(Api);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}