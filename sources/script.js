function callWeather(response) {
  let temperatureDegree = document.querySelector("#temperature");
  temperatureDegree.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let fullDate = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#date-info");

  dateElement.innerHTML = formatDate(fullDate);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon">`;

  getForecast(response.data.city);
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = dayNames[fullDate.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8daacfbefa5ad84o0e990686f432t73c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(callWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
}

function formatForecastDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return dayNames[day.getDay()];
}

function getForecast(city) {
  apiKey = "8daacfbefa5ad84o0e990686f432t73c";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weatherForecast">
      
      <strong class="forecastDayName">
      ${formatForecastDay(day.time)}
      </strong>
      <div class=forecastDegreeGroup> <strong class="forecastDegree">${Math.round(
        day.temperature.maximum
      )}°</strong>${Math.round(day.temperature.minimum)}°
        </div>
        <span class="forecastIcon"><img src="${
          day.condition.icon_url
        }" class="forecastIcon"/></span>
        </div>
        `;
    }
  });
  let forecastElement = document.querySelector("#forecast-box");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
searchCity("Reykjavik");
