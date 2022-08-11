function displayDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  let h3 = document.querySelector("h3");
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  return `${now.getHours()}:${addZero(now.getMinutes())}, ${
    months[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()}, ${days[now.getDay()]}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function weatherForecast(response) {
  let forecast = response.data.daily;

  let forecastTable = document.querySelector("#forecast");

  let forecastHTML = `<div class="week-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
        <img class="forecast-img"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="50"
        />
        <div class="forecast-temp">
          <span class="temp-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="temp-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastTable.innerHTML = forecastHTML;
}

function runForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7daff18a21b320d077bda6c2a9bab00f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;

  let temperature = response.data.main.temp;
  let cityTemperature = document.querySelector(".degrees");
  cityTemperature.innerHTML = Math.round(temperature);

  let celsiusDegrees = document.querySelector("#celsius");
  celsiusDegrees.addEventListener("click", function (event) {
    event.preventDefault();
    let temperatureCelsius = document.querySelector(".degrees");
    temperatureCelsius.innerHTML = Math.round(temperature);
  });

  let fahrenheitDegrees = document.querySelector("#fahrenheit");
  fahrenheitDegrees.addEventListener("click", function (event) {
    event.preventDefault();
    let temperatureFahrenheit = document.querySelector(".degrees");
    temperatureFahrenheit.innerHTML = `${Math.round(temperature * 1.8 + 32)}`;
  });

  let weatherDescription = document.querySelector(".weather-type");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let icon = document.querySelector("#emoji");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );

  runForecast(response.data.coord);
}

function searchButton(city) {
  let apiKey = "7daff18a21b320d077bda6c2a9bab00f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchForm(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-name-input");
  searchButton(cityElement.value);
}

let form = document.querySelector("#city-to-search");
form.addEventListener("submit", searchForm);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7daff18a21b320d077bda6c2a9bab00f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let currentDate = document.querySelector("#date");
let currentTime = new Date();
currentDate.innerHTML = displayDate(currentTime);

let currentPosition = document.querySelector("#current-location");
currentPosition.addEventListener("click", function (event) {
  navigator.geolocation.getCurrentPosition(showPosition);
});

let lisbonSearch = document.querySelector("#city-lisbon");
lisbonSearch.addEventListener("click", function (event) {
  searchButton("Lisbon");
});

let parisSearch = document.querySelector("#city-paris");
parisSearch.addEventListener("click", function (event) {
  searchButton("Paris");
});

let sydneySearch = document.querySelector("#city-sydney");
sydneySearch.addEventListener("click", function (event) {
  searchButton("Sydney");
});

let sanfransiscoSearch = document.querySelector("#city-san-fransisco");
sanfransiscoSearch.addEventListener("click", function (event) {
  searchButton("San Fransisco");
});

searchButton("Kyiv");
