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

  return `${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-name");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let realFeelElement = document.querySelector("#real-feel");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let currentDateElement = document.querySelector("#date");

  celTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemp);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  currentDateElement.innerHTML = formatCurrentDate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "0999e8b27df7fe2ea21ba7c46d2fabaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
 &appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}
function submit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#enterCity");
  search(cityInputElement.value);
}
let form = document.querySelector("#enterCityForm");
form.addEventListener("submit", submit);

search("Toronto");
