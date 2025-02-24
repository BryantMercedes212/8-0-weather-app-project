document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let city = event.target.temperature.value;
  getInformation(city, event.target.x.value);

  event.target.reset();
});

function getInformation(city, x) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => response.json())
    .then((weather) => {
      document.querySelector(
        ".display p"
      ).innerHTML = `<label> <strong> ${weather.nearest_area[0].areaName[0].value}</strong> <label>
                <div class="current-temp grid-three">
                <p><strong> Area:</strong> ${weather.nearest_area[0].areaName[0].value}</p> 
                <p><strong> Region:</strong> ${weather.nearest_area[0].region[0].value} </p>
                <p><strong> Country:</strong> ${weather.nearest_area[0].country[0].value}  </p>
                <p><strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F</p> 
            </div>`;

      document.querySelector(
        ".display .three-day-temp"
      ).innerHTML = ` <div class="today">Today
                <p><strong>Average Temperature: </strong>${weather.weather[0].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong>${weather.weather[0].maxtempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[0].mintempF}</p>
                </div>
                <div class="tomorrow">Tomorrow 
                <p><strong>Average Temperature: </strong>${weather.weather[1].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong> ${weather.weather[1].maxtempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[1].mintempF}°F</p> 
                </div>
                <div class="day-after">Day After Tomorrow 
                <p><strong>Average Temperature: </strong>${weather.weather[2].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong>${weather.weather[2].mintempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[2].maxtempF}°F</p> 
                </div>`;

      if (x === "Get Weather") {
        getCityWeather(city, weather);
      }
    });
}

function getCityWeather(city, weather) {
  const li = document.createElement("li");
  li.innerHTML += `<a href="javascript:getInformation('${city}')">${city} -${weather.current_condition[0].FeelsLikeF}°F</a>`;
  document.querySelector(".previous-search li").classList.add("gone");
  document.querySelector("ul").append(li);
}
