
import axios from 'axios';
import Notiflix from "notiflix";
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from './cat-api';
axios.defaults.headers.common['x-api-key']= 'live_6wIqDfZq1Rpi6GuuxSeR9qwmPffzA87IA4DDRhaZufRrCgNklvzBusUPec9z9HlV'

const refs = {
    select: document.querySelector(".breed-select"),
    catBox: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    errorMessage: document.querySelector('.error'),
}

refs.errorMessage.classList.add('hidden');
refs.loader.classList.add('hidden');


fetchBreeds()
.then(onBreedSelect)
.catch(onErrorHandle);


refs.select.addEventListener('change', onChangeInfo);


function onBreedSelect(data) {
    new SlimSelect({
        select: '#selectElement'
    })
    data.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        refs.select.appendChild(option);
    });    
}

function onErrorHandle() {
    refs.select.classList.add('hidden');
    refs.catBox.classList.add('hidden');
    const failMessage = refs.errorMessage.textContent;
    Notiflix.Notify.failure(`${failMessage}`);

}

function onChangeInfo() {
    const breedId = refs.select.value;
    loader(true);

 fetchCatByBreed(breedId).then(onCatMarkupAdd).catch(onErrorHandle)
}

function onCatMarkupAdd(catData) {
    loader(false);
    refs.catBox.innerHTML= createCatMarkup(catData);
}

function createCatMarkup(data) {


    const catName = data.breeds[0].name;
    const catDesc = data.breeds[0].description;
    const catTemp = data.breeds[0].temperament;
    const catImage = data.url;
    
    return `<img class='cat-img'src="${catImage}" alt="${catName}"></img> 
    <div class='cat-container'><h2 class='cat-title'>Name: ${catName}</h2>
    <p class='cat-desc'>Description: ${catDesc}</p>
    <p class='cat-text'>Temperament: ${catTemp}</p></div>
  `;
    
};

function loader(loadershown) {
    if (loadershown) {
        refs.loader.classList.remove('hidden');
        refs.catBox.classList.add('hidden');
    } else {
        refs.loader.classList.add('hidden');
        refs.catBox.classList.remove('hidden');
    }
}


