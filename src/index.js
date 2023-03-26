import './css/styles.css';
import './fetchCountries.js';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 300;

// fetchCountries('united').
// then(dataCountry => console.log(dataCountry));

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(handleOnClick, DEBOUNCE_DELAY));



function handleOnClick(ev){
    let filter = ev.target.value.toLowerCase().trim();
    if(filter) { 
        fetchCountries(filter).
        then(dataCountry => {
            if(dataCountry.length > 10){

                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            }  
            else if(dataCountry.length <= 10 && dataCountry.length !== 1) {
                info.innerHTML = '';
                renderManyCountries(dataCountry);
                }  else if (dataCountry.length === 1){
                    list.innerHTML = ''
                    renderCountryCard(dataCountry);
                      }
                    
        })
        .catch(error => {
            info.innerHTML = '';
            list.innerHTML = '';
           return  Notiflix.Notify.failure('Oops, there is no country with that name')
        });
    } 
    else {
        info.innerHTML = '';
        list.innerHTML = '';
    };
}

function renderManyCountries(obj){
    const country = obj.map(({ name, flags}) => 
    `<li><img src="${flags.svg}" alt="flag" width='40'/>   ${name.common}</li>`).join('');
    console.log(country);
    list.innerHTML = country;
};

function renderCountryCard(obj) {
    const countryCard = obj.map(({name, flags, capital, population, languages}) =>
    `<h3><img src="${flags.svg}" alt="flag" width='50'>   ${name.official}</h3>
     <p class="subtitle">Capital:  <span class="subtitle_value">${capital}</span></p>
     <p class="subtitle">Population:  <span class="subtitle_value">${population}</span></p>
     <p class="subtitle">Languages:  <span class="subtitle_value">${Object.values(languages)}</span></p>`).join('');
       info.innerHTML = countryCard;
    }


      














