const BASE = 'https://localhost:44361'
const BASE_URL = BASE + '/api/wishlist';

const getById = async id => {
  const response = await fetch(`${BASE_URL}/${id}`)
  const data = await response.json();
  
  return data;
}

export default {getById}
