
import axios from 'axios';
axios.defaults.headers.common['x-api-key']= 'live_6wIqDfZq1Rpi6GuuxSeR9qwmPffzA87IA4DDRhaZufRrCgNklvzBusUPec9z9HlV'

function fetchBreeds() {
    const catBreeds = 'https://api.thecatapi.com/v1/breeds'
  return axios.get(catBreeds)
.then(res => res.data).catch(e => console.log(e))
}


function fetchCatByBreed(breedId) {
    const specificCatBreed =  `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
return axios.get(specificCatBreed).then(res => res.data[0]).catch(e => console.log(e))
}

export {fetchBreeds ,fetchCatByBreed}

