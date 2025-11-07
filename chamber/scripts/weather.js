const forecastContainer = document.getElementById("forecast");
const weatherInfo = document.getElementById("weatherInfo");

const weatherURL =
  "https://api.openweathermap.org/data/2.5/forecast?lat=16.7666&lon=-3.0026&units=imperial&appid=f26a1d2c7387a78efdda84903fecbb7f";

async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();

    const current = data.list[0];
    weatherInfo.innerHTML = `
      <p>${current.main.temp.toFixed(1)}°F</p>
      <p>${current.weather[0].description}</p>
      <p>Humidity: ${current.main.humidity}%</p>
    `;

    forecastContainer.innerHTML = "";
    const dailyForecasts = data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    dailyForecasts.slice(0, 3).forEach((day) => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      });
      const temp = day.main.temp.toFixed(1);
      forecastContainer.innerHTML += `<p>${date}: ${temp}°F</p>`;
    });
  } catch (error) {
    console.error("Weather error:", error);
  }
}

getWeather();
