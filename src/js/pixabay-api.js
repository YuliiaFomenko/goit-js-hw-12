import axios from 'axios';

const API_KEY = '49021179-e432bb9a2ad6e70ca9f1cd413';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data.hits)
    .catch(error => {
      console.error('Error fetching images:', error);
      return [];
    });
}
