function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[dayIndex];

  return `${hours} : ${minutes} ${day}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let dateElement = document.querySelector("#time");
let date = new Date();
dateElement.innerHTML = formatDate(date);

function currentDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
  ];

  let exactDate = date.getDate();
  let monthIndex = date.getMonth();
  month = months[monthIndex];

  let year = date.getFullYear();
  return `${exactDate} ${month} ${year}`;
}
let dateInput = document.querySelector("#current-date");
dateInput.innerHTML = currentDate(date);

function getForecast(coordinates) {
  let apiKey = "5672206219da575792b9c579b8017620";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity - ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind speed - ${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  let iconElementAPI = response.data.weather[0].icon;
 
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconElementAPI}@2x.png`
  );
    
 if (iconElementAPI === "01d") {
    iconElement.setAttribute("src", `./images/01d-main.png`);
  } else if (iconElementAPI === "02d") {
    iconElement.setAttribute("src", `./images/02d-main.png`);
  }
  else if (iconElementAPI === "03d") {
    iconElement.setAttribute("src", `./images/03d-main.png`);
  }
  else if (iconElementAPI === "04d" || "04n") {
    iconElement.setAttribute("src", `./images/04d-main.png`);
  }
  else if (iconElementAPI === "09d") {
    iconElement.setAttribute("src", `./images/09d-main.png`);
  }
  else if (iconElementAPI === "10d") {
    iconElement.setAttribute("src", `./images/10d-main.png`);
  }
  else if (iconElementAPI === "11d") {
    iconElement.setAttribute("src", `./images/11d-main.png`);
  }
  else if (iconElementAPI === "13d") {
    iconElement.setAttribute("src", `./images/13d-main.png`);
  }

  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  getForecast(response.data.coord);
  }

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
     let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
     forecastHTML = 
    forecastHTML + 
  `<div class="col" id="forecast-days">
    <ul>
      <li class="forecast-date">${formatDay(forecastDay.dt)}</li>
      <img src="images/${forecastDay.weather[0].icon}.png";  alt="" />
      <li class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}°C</li>
      <li class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}°C</li>
    </ul>
  </div>`;
    }
    });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
     }

function searchCity(city) {
  let apiKey = "5672206219da575792b9c579b8017620";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5672206219da575792b9c579b8017620";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
      }

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    }
    
let temperatureElement = document.querySelector("#temperature");

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Kyiv");