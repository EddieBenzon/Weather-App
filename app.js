const key = "78b314d11fa47828771f184a2734b69c";

// main elements
let iconElement = document.querySelector(".main-icon");
let temperatureElement = document.querySelector(".temperature");
let descriptionElement = document.querySelector(".description");
let locationElement = document.querySelector(".location");
let notificationElement = document.querySelector(".notification");

// Displaying 6 day forecast
let day1temp = document.getElementById("day-1-temp");
let day2temp = document.getElementById("day-2-temp");
let day3temp = document.getElementById("day-3-temp");
let day4temp = document.getElementById("day-4-temp");
let day5temp = document.getElementById("day-5-temp");
let day6temp = document.getElementById("day-6-temp");

const weather = {
  unit: "celsius",
};

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
  getDays(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = "block";
}

function searchCity() {
  notificationElement.style.display = "none";
  let searchElement = document.querySelector(".text-input").value;
  let cityAPI = `https://api.openweathermap.org/data/2.5/weather?q=${searchElement}&units=metric&appid=${key}`;
  fetch(cityAPI)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      console.log(data);
      let lat = data.coord.lat;
      let long = data.coord.lon;
      let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&units=metric&appid=${key}`;
      getDays(lat, long);
      weather.temperature = Math.floor(data.main.temp);
      weather.temperatureF = Math.floor(data.main.temp * 1.8 + 32);
      weather.description = data.weather[0].description;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.iconID = data.weather[0].icon;
    })
    .then(function () {
      displayWeather();
    });
}

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      weather.temperature = Math.floor(data.main.temp);
      weather.temperatureF = Math.floor(data.main.temp * 1.8 + 32);
      weather.description = data.weather[0].description;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.iconID = data.weather[0].icon;
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  temperatureElement.innerHTML = weather.temperature + "°C";
  descriptionElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  iconElement.innerHTML = `<img src="Icons/${weather.iconID}.png" alt="" />`;
}

function convertUnits() {
  if (weather.unit === "celsius") {
    temperatureElement.innerHTML = `${weather.temperatureF}°F`;
    weather.unit = "fahrenheit";
  } else if (weather.unit === "fahrenheit") {
    temperatureElement.innerHTML = `${weather.temperature}°C`;
    weather.unit = "celsius";
  }
}

function getDays(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${key}`;
  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      createDays(data);
    });
}

function createDays(data) {
  day1temp.innerHTML = `${Math.floor(data.daily[0].temp.max)}°C/${Math.floor(
    data.daily[0].temp.min
  )}°C`;
  document.getElementById(
    "img1"
  ).src = `Icons/${data.daily[1].weather[0].icon}.png`;
  day2temp.innerHTML = `${Math.floor(data.daily[1].temp.max)}°C/${Math.floor(
    data.daily[1].temp.min
  )}°C`;
  document.getElementById(
    "img2"
  ).src = `Icons/${data.daily[2].weather[0].icon}.png`;
  day3temp.innerHTML = `${Math.floor(data.daily[2].temp.max)}°C/${Math.floor(
    data.daily[2].temp.min
  )}°C`;
  document.getElementById(
    "img3"
  ).src = `Icons/${data.daily[3].weather[0].icon}.png`;
  day4temp.innerHTML = `${Math.floor(data.daily[3].temp.max)}°C/${Math.floor(
    data.daily[3].temp.min
  )}°C`;
  document.getElementById(
    "img4"
  ).src = `Icons/${data.daily[4].weather[0].icon}.png`;
  day5temp.innerHTML = `${Math.floor(data.daily[4].temp.max)}°C/${Math.floor(
    data.daily[4].temp.min
  )}°C`;
  document.getElementById(
    "img5"
  ).src = `Icons/${data.daily[5].weather[0].icon}.png`;
  day6temp.innerHTML = `${Math.floor(data.daily[5].temp.max)}°C/${Math.floor(
    data.daily[5].temp.min
  )}°C`;
  document.getElementById(
    "img6"
  ).src = `Icons/${data.daily[0].weather[0].icon}.png`;
}
