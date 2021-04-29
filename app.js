// main elements
let iconElement = document.querySelector(".main-icon");
let temperatureElement = document.querySelector(".temperature");
let descriptionElement = document.querySelector(".description");
let locationElement = document.querySelector(".location");
let notificationElement = document.querySelector(".notification");

let weekArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthArray = [
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

let d = new Date();
let monthIndex = d.getMonth();
let currentMonth = monthArray[monthIndex];
let currentDay = d.getDate();
let dayOfWeek = weekArray[d.getDay()];

// Displaying 6 day forecast
let day1temp = document.getElementById("day-1-temp");
let day2temp = document.getElementById("day-2-temp");
let day3temp = document.getElementById("day-3-temp");
let day4temp = document.getElementById("day-4-temp");
let day5temp = document.getElementById("day-5-temp");
let day6temp = document.getElementById("day-6-temp");
let daysArray = [day1temp, day2temp, day3temp, day4temp, day5temp, day6temp];

let img1 = document.getElementById(".img1");
let img2 = document.getElementById(".img2");
let img3 = document.getElementById(".img3");
let img4 = document.getElementById(".img4");
let img5 = document.getElementById(".img5");
let img6 = document.getElementById(".img6");
let imgArray = [img1, img2, img3, img4, img5, img6];

let day1 = document.getElementById("day-name-1");
let day2 = document.getElementById("day-name-2");
let day3 = document.getElementById("day-name-3");
let day4 = document.getElementById("day-name-4");
let day5 = document.getElementById("day-name-5");
let day6 = document.getElementById("day-name-6");
let weekdayArray = [day1, day2, day3, day4, day5, day6];

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
      document.querySelector(
        ".current-date"
      ).innerHTML = `${currentMonth} ${currentDay}, ${dayOfWeek}`;
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
  document.querySelector(
    ".current-date"
  ).innerHTML = `${currentMonth} ${currentDay}, ${dayOfWeek}`;
  let dayPlus = 1;
  for (i = 0; i < 6; i++) {
    weekdayArray[i].innerHTML = weekArray[d.getDay() + dayPlus];
    dayPlus++;
  }
}

function convertUnits() {
  if (weather.unit === "celsius") {
    temperatureElement.innerHTML = `${weather.temperatureF}°F`;
    daysArray.forEach((element, index) => {
      element.innerHTML = `${forecast[index].tempFMax}/${forecast[index].tempFMin}°F`;
    });
    weather.unit = "fahrenheit";
  } else if (weather.unit === "fahrenheit") {
    daysArray.forEach((element, index) => {
      element.innerHTML = `${forecast[index].tempMax}/${forecast[index].tempMin}°C`;
    });
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
      for (i = 0; i < 6; i++) {
        forecast[i] = new Day(
          Math.floor(data.daily[i + 1].temp.max),
          Math.floor(data.daily[i + 1].temp.min),
          Math.floor(data.daily[i + 1].temp.max * 1.8 + 32),
          Math.floor(data.daily[i + 1].temp.min * 1.8 + 32)
        );
      }
      displayDays(data);
    });
}

function displayDays(data) {
  daysArray.forEach((element, index) => {
    element.innerHTML = `${forecast[index].tempMax}/${forecast[index].tempMin}°C`;
  });
  imgArray.forEach((element, index) => {
    document.getElementById(`img${index + 1}`).src = `Icons/${
      data.daily[index + 1].weather[0].icon
    }.png`;
  });
}
const key = "78b314d11fa47828771f184a2734b69c";
