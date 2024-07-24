import axios from 'axios';





/**
 * Se extare normal 
 * @param {*} city 
 * @param {*} minRentPrice 
 * @param {*} maxRentPrice 
 * @param {*} minAreaSize 
 * @param {*} maxAreaSize 
 * @param {*} page 
 * @param {*} limit 
 * @param {*} sortField 
 * @param {*} sortOrder 
 * @returns 
 */
export const  getFlats = async (city, minRentPrice, maxRentPrice, minAreaSize, maxAreaSize, page, limit, sortField, sortOrder) => {
  console.log('city:', city);
  console.log('minRentPrice:', minRentPrice);
  console.log('maxRentPrice:', maxRentPrice);
  console.log('minAreaSize:', minAreaSize);
  console.log('maxAreaSize:', maxAreaSize);
  console.log('page:', page);
  console.log('limit:', limit);
  console.log('sortField:', sortField);
  console.log('sortOrder:', sortOrder);
  const apis = 'http://localhost:3006/api/v1/flats/getFlats';


  try {
    const response = await axios.get(apis, {
      params: {
        city,
        minRentPrice,
        maxRentPrice,
        minAreaSize,
        maxAreaSize,
        page,
        limit,
        sortField,
        sortOrder
      }
      
    });
    console.log('response:', response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}


/**
 * 
 * @param {*} id 
 * @returns 
 */ 
export const getFlatsBerear = async () => {
  const apis = `http://localhost:3006/api/v1/flats/getFlatsBerear`;
  try {
    const response = await axios.get(apis);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

