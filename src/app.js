function forecastDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];

  return `${day}.`;
}

function formatCurrentDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let actualDate = date.getDate();
  let year = date.getFullYear();

  return `${formatHours(timestamp)}<br>
  ${day}., ${month}. ${actualDate}, ${year}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours > 12) {
    hours = hours - 12;
    if (hours === 0) {
      hours = "12";
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  //hours += hours >= 12 ? "pm" : "am";
  //let pm = document.querySelector("#pm");
  //if (hours >= 12) pm.innerHTML += "pm";
  return `${hours}:${minutes}`;
}

function displayTemp(response) {
  //console.log(response);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-name");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let realFeelElement = document.querySelector("#real-feel");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let currentDateElement = document.querySelector("#date");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );

  //let timeElement = document.querySelector("#time");

  celTemp = Math.round(response.data.main.temp);
  maxtemp = Math.round(response.data.main.temp_max);
  mintemp = Math.round(response.data.main.temp_min);
  realfeeltemp = Math.round(response.data.main.feels_like);

  temperatureElement.innerHTML = Math.round(celTemp);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  realFeelElement.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
  maxTempElement.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  minTempElement.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  currentDateElement.innerHTML = formatCurrentDate(response.data.dt * 1000);
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  //timeElement.innerHTML = formatHours(response.data.dt * 1000);

  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&daily&appid=0999e8b27df7fe2ea21ba7c46d2fabaa&units=metric`;
  //console.log(response);
  axios.get(apiUrl).then(displayDailyForecast);
}

//Forecast 3 hours
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `<div class="col-2">
              <span>${formatHours(forecast.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" />
              <div id="hourly-forecast-temp">
                <span>${Math.round(forecast.main.temp)}°C</span>
               
               
              </div>
            </div>`;
  }
}

//daily forecast
function displayDailyForecast(response) {
  let forecastDailyElement = document.querySelector("#forecastDaily");
  forecastDailyElement.innerHTML = null;
  let forecastDaily = null;
  let uviIndexElement = document.querySelector("#uvIndex");
  uviIndexElement.innerHTML = response.data.current.uvi;

  for (let index = 1; index < 7; index++) {
    forecastDaily = response.data.daily[index];
    //console.log(response);

    forecastDailyElement.innerHTML += `<div class="col-2">
              <span id="day">${forecastDate(forecastDaily.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecastDaily.weather[0].icon
              }@2x.png" />
              <div id="daily-forecast-temp">
                <span>${Math.round(forecastDaily.temp.min)}°C/${Math.round(
      forecastDaily.temp.max
    )}°C</span>
              </div>
            </div>`;
  }
}

function search(city) {
  let apiKey = "0999e8b27df7fe2ea21ba7c46d2fabaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
 &appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}
 &appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function submit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#enterCity");
  search(cityInputElement.value);
  let input = document.querySelector("#enterCity");
  input.value = "";
}

function fahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let far = (celTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(far);

  document.querySelector("#max-temp").innerHTML = `${Math.round(
    (maxtemp * 9) / 5 + 32
  )}°F`;

  document.querySelector("#min-temp").innerHTML = `${Math.round(
    (mintemp * 9) / 5 + 32
  )}°F`;

  document.querySelector("#real-feel").innerHTML = `${Math.round(
    (realfeeltemp * 9) / 5 + 32
  )}°F`;
}

function celsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celTemp;

  document.querySelector("#max-temp").innerHTML = `${Math.round(maxtemp)}°C`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(mintemp)}°C`;
  document.querySelector("#real-feel").innerHTML = `${Math.round(
    realfeeltemp
  )}°C`;
}

//CurrentLocation
function retrievePosition(position) {
  let apiKey = "0999e8b27df7fe2ea21ba7c46d2fabaa";

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#enterCityForm");
form.addEventListener("submit", submit);

let fahrenheitLink = document.querySelector("#far-link");
fahrenheitLink.addEventListener("click", fahrenheit);

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", celsius);

search("Toronto");
