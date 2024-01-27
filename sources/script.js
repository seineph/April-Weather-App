function callWeather(response) {
  let temperatureDegree = document.querySelector("#temperature");
  temperatureDegree.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
}

function searchCity(city) {
  let apiKey = "8daacfbefa5ad84o0e990686f432t73c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(callWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
searchCity("Reykjavik");
