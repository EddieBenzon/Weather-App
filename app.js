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

const forecast = [];

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
      let lat = data.coord.lat;
      let long = data.coord.lon;
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
  clearSearch();
}

function clearSearch() {
  document.querySelector(".text-input").value = "";
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
    day1temp.innerHTML = `${forecast[0].tempFMax}/${forecast[0].tempFMin}°F`;
    day2temp.innerHTML = `${forecast[1].tempFMax}/${forecast[1].tempFMin}°F`;
    day3temp.innerHTML = `${forecast[2].tempFMax}/${forecast[2].tempFMin}°F`;
    day4temp.innerHTML = `${forecast[3].tempFMax}/${forecast[3].tempFMin}°F`;
    day5temp.innerHTML = `${forecast[4].tempFMax}/${forecast[4].tempFMin}°F`;
    day6temp.innerHTML = `${forecast[5].tempFMax}/${forecast[5].tempFMin}°F`;
    weather.unit = "fahrenheit";
  } else if (weather.unit === "fahrenheit") {
    day1temp.innerHTML = `${forecast[0].tempMax}/${forecast[0].tempMin}°C`;
    day2temp.innerHTML = `${forecast[1].tempMax}/${forecast[1].tempMin}°C`;
    day3temp.innerHTML = `${forecast[2].tempMax}/${forecast[2].tempMin}°C`;
    day4temp.innerHTML = `${forecast[3].tempMax}/${forecast[3].tempMin}°C`;
    day5temp.innerHTML = `${forecast[4].tempMax}/${forecast[4].tempMin}°C`;
    day6temp.innerHTML = `${forecast[5].tempMax}/${forecast[5].tempMin}°C`;
    temperatureElement.innerHTML = `${weather.temperature}°C`;
    weather.unit = "celsius";
  }
}

function Day(tempMax, tempMin, tempFMax, tempFMin) {
  this.tempMax = tempMax;
  this.tempMin = tempMin;
  this.tempFMax = tempFMax;
  this.tempFMin = tempFMin;
}

function getDays(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${key}`;
  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      console.log(data);
      forecast[0] = new Day(
        Math.floor(data.daily[1].temp.max),
        Math.floor(data.daily[1].temp.min),
        Math.floor(data.daily[1].temp.max * 1.8 + 32),
        Math.floor(data.daily[1].temp.max * 1.8 + 32)
      );
      forecast[1] = new Day(
        Math.floor(data.daily[2].temp.max),
        Math.floor(data.daily[2].temp.min),
        Math.floor(data.daily[2].temp.max * 1.8 + 32),
        Math.floor(data.daily[2].temp.max * 1.8 + 32)
      );
      forecast[2] = new Day(
        Math.floor(data.daily[3].temp.max),
        Math.floor(data.daily[3].temp.min),
        Math.floor(data.daily[3].temp.max * 1.8 + 32),
        Math.floor(data.daily[3].temp.max * 1.8 + 32)
      );
      forecast[3] = new Day(
        Math.floor(data.daily[4].temp.max),
        Math.floor(data.daily[4].temp.min),
        Math.floor(data.daily[4].temp.max * 1.8 + 32),
        Math.floor(data.daily[4].temp.max * 1.8 + 32)
      );
      forecast[4] = new Day(
        Math.floor(data.daily[5].temp.max),
        Math.floor(data.daily[5].temp.min),
        Math.floor(data.daily[5].temp.max * 1.8 + 32),
        Math.floor(data.daily[5].temp.max * 1.8 + 32)
      );
      forecast[5] = new Day(
        Math.floor(data.daily[6].temp.max),
        Math.floor(data.daily[6].temp.min),
        Math.floor(data.daily[6].temp.max * 1.8 + 32),
        Math.floor(data.daily[6].temp.max * 1.8 + 32)
      );
      displayDays(data);
    });
}

function displayDays(data) {
  day1temp.innerHTML = `${forecast[0].tempMax}/${forecast[0].tempMin}°C`;
  document.getElementById(
    "img1"
  ).src = `Icons/${data.daily[1].weather[0].icon}.png`;
  day2temp.innerHTML = `${forecast[1].tempMax}/${forecast[1].tempMin}°C`;
  document.getElementById(
    "img2"
  ).src = `Icons/${data.daily[2].weather[0].icon}.png`;
  day3temp.innerHTML = `${forecast[2].tempMax}/${forecast[2].tempMin}°C`;
  document.getElementById(
    "img3"
  ).src = `Icons/${data.daily[3].weather[0].icon}.png`;
  day4temp.innerHTML = `${forecast[3].tempMax}/${forecast[3].tempMin}°C`;
  document.getElementById(
    "img4"
  ).src = `Icons/${data.daily[4].weather[0].icon}.png`;
  day5temp.innerHTML = `${forecast[4].tempMax}/${forecast[4].tempMin}°C`;
  document.getElementById(
    "img5"
  ).src = `Icons/${data.daily[5].weather[0].icon}.png`;
  day6temp.innerHTML = `${forecast[5].tempMax}/${forecast[5].tempMin}°C`;
  document.getElementById(
    "img6"
  ).src = `Icons/${data.daily[6].weather[0].icon}.png`;
}
const key = "78b314d11fa47828771f184a2734b69c";
