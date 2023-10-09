function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".value");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celTemp = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = celTemp;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFar(event) {
  event.preventDefault();
  let farTemp = Math.round((celTemp * 9) / 5 + 32);
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let temperatureElement = document.querySelector(".value");
  temperatureElement.innerHTML = farTemp;
}

function showCel(event) {
  event.preventDefault();
  celLink.classList.add("active");
  farLink.classList.remove("active");
  let temperatureElement = document.querySelector(".value");
  temperatureElement.innerHTML = celTemp;
}

let celTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farLink = document.querySelector("#far");
farLink.addEventListener("click", showFar);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", showCel);

search("New York");
