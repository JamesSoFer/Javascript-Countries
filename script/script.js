//
// Project
//

// get form from html
const myForm = document.getElementById('myForm');

// Get countries function
function getCountryInfo(countries) {
  // get ul
  const listCountry = document.getElementById('list-country');
  listCountry.innerHTML = '';
  // create the item list
  for (let i = 0; i < countries.length; i += 1) {
    const countryNameItem = document.createElement('li');
    listCountry.appendChild(countryNameItem);
    const info = `
      <div id="${countries[i].name}title">
        <h3>${countries[i].name}</h3>
      </div>
      <div id="${countries[i].name}displayInfo">
        <img src = "${countries[i].flag}" alt = "img-flag">
        <p> Capital: ${countries[i].capital}</p>
        <p> Region: ${countries[i].region}</p>
        <p> Subregion: ${countries[i].subregion}</p>
        <p> Poblacion: ${countries[i].population}</p>
        <p> Area: ${countries[i].area}</p>
        <p> Idioma: "${countries[i].language}"</p>
        <p> Moneda: "${countries[i].currency}"</p>
        <button id = "${countries[i].name}close">
          close X
        <button>
      </div>
      `;
    countryNameItem.innerHTML = info;

    // events to close and display info the info
    const displayInfo = document.getElementById(`${countries[i].name}displayInfo`);
    displayInfo.style.display = 'none';
    const title = document.getElementById(`${countries[i].name}title`);
    title.addEventListener('click', () => {
      displayInfo.style.display = 'block';
    });
    const closeInfo = document.getElementById(`${countries[i].name}close`);
    closeInfo.addEventListener('click', () => {
      displayInfo.style.display = 'none';
    });
  }
}
fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => response.json())
  .then((data) => {
    getCountryInfo(data);
    // Add the event to search the countries by typing
    myForm.addEventListener('input', (event) => {
      event.preventDefault();
      // Filter Countries
      const searchEng = myForm.elements[0].value;
      const searchMyCountry = data.filter((element) => element.name.toLowerCase().includes(`${searchEng.toLowerCase()}`));
      if (!searchMyCountry) {
        getCountryInfo(data);
      } else {
        getCountryInfo(searchMyCountry);
      }
    });
  });
