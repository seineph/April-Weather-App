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
  let fullDate = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#date-info");
  dateElement.innerHTML = formatDate(fullDate);
}

function formatDate(fullDate) {
  let date = fullDate.getDate();
  let minutes = fullDate.getMinutes();
  let hours = fullDate.getHours();
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayNames[fullDate.getDay()];
  return `${day} ${hours}:${minutes}`;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
