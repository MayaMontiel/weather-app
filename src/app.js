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
  //return date.toLocaleString(`en-US`, {
  // hours: `numeric`,
  // minutes: `numeric`,
  // hours12: true,
  //});
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

  //for (let index = 0; index < 6; index++) {
  forecast = response.data.list[0];
  forecast2 = forecast.main.temp;
  console.log(forecast);
  forecastElement.innerHTML += `<div class="col-2">
              <span>${formatHours(forecast.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" />
              <div id="hourly-forecast-temp">
                <span>${Math.round(forecast.main.temp)}°C</span>
               
               
              </div>
            </div>`;

  forecast = response.data.list[1];
  console.log(forecast);

  forecastElement.innerHTML += `<div class="col-2">
              <span>${formatHours(forecast.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" />
              <div id="hourly-forecast-temp">
                <span>${Math.round(forecast.main.temp)}°C</span>
               
               
              </div>
            </div>`;

  forecast = response.data.list[2];
  console.log(forecast);

  forecastElement.innerHTML += `<div class="col-2">
              <span>${formatHours(forecast.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" />
              <div id="hourly-forecast-temp">
                <span>${Math.round(forecast.main.temp)}°C</span>
               
               
              </div>
            </div>`;

  forecast = response.data.list[3];
  console.log(forecast);

  forecastElement.innerHTML += `<div class="col-2">
              <span>${formatHours(forecast.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" />
              <div id="hourly-forecast-temp">
                <span>${Math.round(forecast.main.temp)}°C</span>
               
               
              </div>
            </div>`;

  forecast = response.data.list[4];
  console.log(forecast);

  forecastElement.innerHTML += `<div class="col-2">
              <span>${formatHours(forecast.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" />
              <div id="hourly-forecast-temp">
                <span>${Math.round(forecast.main.temp)}°C</span>
               
               
              </div>
            </div>`;

  forecast = response.data.list[5];
  console.log(forecast);

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
//}

//daily forecast
function displayDailyForecast(response) {
  let forecastDailyElement = document.querySelector("#forecastDaily");
  forecastDailyElement.innerHTML = null;
  let forecastDaily = null;

  let uviIndexElement = document.querySelector("#uvIndex");
  uviIndexElement.innerHTML = `${Math.round(response.data.current.uvi)}`;
  let popElement = document.querySelector("#pop");
  popElement.innerHTML = `${Math.round(response.data.daily[0].pop)}`;
  console.log(response);

  //for (let index = 1; index < 7; index++) {
  forecastDaily = response.data.daily[1];
  forecastDailymin = forecastDaily.temp.min;
  forecastDailymax = forecastDaily.temp.max;
  //console.log(forecastDailymax);

  forecastDailyElement.innerHTML += `<div class="col-2">
              <span id="day">${forecastDate(forecastDaily.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecastDaily.weather[0].icon
              }@2x.png" />
              <div class="daily-forecast-temp">
                <span id = "dailyMin">${Math.round(
                  forecastDaily.temp.min
                )}°C</span>/<span id="dailyMax">${Math.round(
    forecastDaily.temp.max
  )}°C</span>
              </div>
            </div>`;

  forecastDaily2 = response.data.daily[2];
  forecastDailymin2 = forecastDaily2.temp.min;
  forecastDailymax2 = forecastDaily2.temp.max;
  //console.log(forecastDaily);

  forecastDailyElement.innerHTML += `<div class="col-2">
              <span id="day">${forecastDate(forecastDaily2.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecastDaily2.weather[0].icon
              }@2x.png" />
              <div class="daily-forecast-temp">
                <span id="dailyMin2">${Math.round(
                  forecastDaily2.temp.min
                )}°C</span>/<span id="dailyMax2">${Math.round(
    forecastDaily2.temp.max
  )}°C</span>
              </div>
            </div>`;

  forecastDaily3 = response.data.daily[3];
  forecastDailymin3 = forecastDaily3.temp.min;
  forecastDailymax3 = forecastDaily3.temp.max;
  //console.log(forecastDaily);

  forecastDailyElement.innerHTML += `<div class="col-2">
              <span id="day">${forecastDate(forecastDaily3.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecastDaily3.weather[0].icon
              }@2x.png" />
              <div class="daily-forecast-temp">
                <span id="dailyMin3">${Math.round(
                  forecastDaily3.temp.min
                )}°C</span>/<span id="dailyMax3">${Math.round(
    forecastDaily3.temp.max
  )}°C</span>
              </div>
            </div>`;

  forecastDaily4 = response.data.daily[4];
  forecastDailymin4 = forecastDaily4.temp.min;
  forecastDailymax4 = forecastDaily4.temp.max;
  //console.log(forecastDaily);

  forecastDailyElement.innerHTML += `<div class="col-2">
              <span id="day">${forecastDate(forecastDaily4.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecastDaily4.weather[0].icon
              }@2x.png" />
              <div class="daily-forecast-temp">
                <span id="dailyMin4">${Math.round(
                  forecastDaily4.temp.min
                )}°C</span>/<span id="dailyMax4">${Math.round(
    forecastDaily4.temp.max
  )}°C</span>
              </div>
            </div>`;

  forecastDaily5 = response.data.daily[5];
  forecastDailymin5 = forecastDaily5.temp.min;
  forecastDailymax5 = forecastDaily5.temp.max;
  //console.log(forecastDaily);

  forecastDailyElement.innerHTML += `<div class="col-2">
              <span id="day">${forecastDate(forecastDaily5.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecastDaily5.weather[0].icon
              }@2x.png" />
              <div class="daily-forecast-temp">
                <span id="dailyMin5">${Math.round(
                  forecastDaily5.temp.min
                )}°C</span>/<span id="dailyMax5">${Math.round(
    forecastDaily5.temp.max
  )}°C</span>
              </div>
            </div>`;

  forecastDaily6 = response.data.daily[6];
  forecastDailymin6 = forecastDaily6.temp.min;
  forecastDailymax6 = forecastDaily6.temp.max;
  //console.log(forecastDaily);

  forecastDailyElement.innerHTML += `<div class="col-2">
              <span id="day">${forecastDate(forecastDaily6.dt * 1000)}</span>
              <img id = "icon" src="http://openweathermap.org/img/wn/${
                forecastDaily6.weather[0].icon
              }@2x.png" />
              <div class="daily-forecast-temp">
                <span id="dailyMin6">${Math.round(
                  forecastDaily6.temp.min
                )}°C</span>/<span id="dailyMax6">${Math.round(
    forecastDaily6.temp.max
  )}°C</span>
              </div>
            </div>`;

  //}
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

  //forecast hourly c to f
  // let forecastHourly = document.querySelectorAll("#hourly-forecast-temp");
  //forecastHourly.forEach(function (forecastItem) {
  // forecastItem.innerHTML = `${Math.round(forecast2 * 9) / 5 + 32}°F`;
  //});

  //Daily Forecast min  far
  document.querySelector("#dailyMin").innerHTML = `${Math.round(
    (forecastDailymin * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMin2").innerHTML = `${Math.round(
    (forecastDailymin2 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMin3").innerHTML = `${Math.round(
    (forecastDailymin3 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMin4").innerHTML = `${Math.round(
    (forecastDailymin4 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMin5").innerHTML = `${Math.round(
    (forecastDailymin5 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMin6").innerHTML = `${Math.round(
    (forecastDailymin6 * 9) / 5 + 32
  )}°F`;

  //daily forecast max temp far
  document.querySelector("#dailyMax").innerHTML = `${Math.round(
    (forecastDailymax * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMax2").innerHTML = `${Math.round(
    (forecastDailymax2 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMax3").innerHTML = `${Math.round(
    (forecastDailymax3 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMax4").innerHTML = `${Math.round(
    (forecastDailymax4 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMax5").innerHTML = `${Math.round(
    (forecastDailymax5 * 9) / 5 + 32
  )}°F`;
  document.querySelector("#dailyMax6").innerHTML = `${Math.round(
    (forecastDailymax6 * 9) / 5 + 32
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

  //daiy forecast min  cel
  document.querySelector("#dailyMin").innerHTML = `${Math.round(
    forecastDailymin
  )}°C`;
  document.querySelector("#dailyMin2").innerHTML = `${Math.round(
    forecastDailymin2
  )}°C`;
  document.querySelector("#dailyMin3").innerHTML = `${Math.round(
    forecastDailymin3
  )}°C`;
  document.querySelector("#dailyMin4").innerHTML = `${Math.round(
    forecastDailymin4
  )}°C`;
  document.querySelector("#dailyMin5").innerHTML = `${Math.round(
    forecastDailymin5
  )}°C`;
  document.querySelector("#dailyMin6").innerHTML = `${Math.round(
    forecastDailymin6
  )}°C`;

  //daiy forecast max  cel
  document.querySelector("#dailyMax").innerHTML = `${Math.round(
    forecastDailymax
  )}°C`;
  document.querySelector("#dailyMax2").innerHTML = `${Math.round(
    forecastDailymax2
  )}°C`;
  document.querySelector("#dailyMax3").innerHTML = `${Math.round(
    forecastDailymax3
  )}°C`;
  document.querySelector("#dailyMax4").innerHTML = `${Math.round(
    forecastDailymax4
  )}°C`;
  document.querySelector("#dailyMax5").innerHTML = `${Math.round(
    forecastDailymax5
  )}°C`;
  document.querySelector("#dailyMax6").innerHTML = `${Math.round(
    forecastDailymax6
  )}°C`;
  //document.querySelector("#hourly-forecast-temp").innerHTML = `${Math.round(
  //  forecast2
  //)}°C`;

  //let forecastHourly = document.querySelectorAll("#hourly-forecast-temp");
  //forecastHourly.forEach(function (forecastItem) {
  // forecastItem.innerHTML = `${Math.round(forecast2)}°C`;
  //});
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
