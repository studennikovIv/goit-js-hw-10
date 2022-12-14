import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries';
var debounce = require('debounce');



const refs = {
    inputEl: document.querySelector('#search-box'),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
};
const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
    const name = refs.inputEl.value.trim();
    if (name === "") {
        return refs.countryList.innerHTML = ""}
   
        

    fetchCountries(name)
        .then(countries => {
            refs.countryList.innerHTML = ''
            refs.countryInfo.innerHTML = ''
            if (countries.length === 1) {
                refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
                refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
            } else if (countries.length >= 10) {
                refs.countryList.innerHTML = ''
                refs.countryInfo.innerHTML = ''
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
                
            } else {
                refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
            }
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name') ;
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
        
});


function renderCountryList(arrayNameFlag) {
    const markup = arrayNameFlag
        .map(({ flags, name }) => {
            return `<li class="country-list_item"><img  class="country-list__flag"  src="${flags.svg}" alt="Flag of ${name.official}" width = 40px height = 30px><h2>${name.official}</h2> </li>`
        }).join("")
    return markup
};

function renderCountryInfo(arrayFullInfo) {
    const markup = arrayFullInfo
        .map(({ capital, population, languages }) => {
            return `<ul class="country-info_list">
            <li class = country-info_item><p><b>Capital: </b>${capital}</p></li>
            <li class = country-info_item><p><b>Population: </b>${population}</p></li>
            <li class = country-info_item><p><b>Languages: </b>${Object.values(languages).join(',')}</p></li></ul>`
        }).join("")
    return markup;
};
}
