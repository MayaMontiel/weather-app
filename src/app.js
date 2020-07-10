function displayTemp(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-name");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let realFeelElement = document.querySelector("#real-feel");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");

  celTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemp);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
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
