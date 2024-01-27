function callWeather(response) {
  let temperatureDegree = document.querySelector("#temperature");
  temperatureDegree.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);
  console.log(date);

  console.log(response.data.time);
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
