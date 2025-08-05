const apiKey = "360e47da702a82c3c3504a806826c0eb";

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  const message = document.getElementById("message");
  const weatherBox = document.getElementById("weatherBox");
  message.textContent = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    // console.log(data);

    document.getElementById("cityName").textContent = city;
    document.getElementById("temperature").textContent = `${data.main.temp} °C`;
    document.getElementById("humidity").textContent = `${data.main.humidity} %`;
    document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
    document.getElementById("condition").textContent = data.weather[0].main;

    weatherBox.classList.remove("hidden");
    message.textContent = "";
  } catch (error) {
    // console.error("Error fetching weather:", error);
    weatherBox.classList.add("hidden");
    message.textContent = "❌ " + error.message;
  }
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  fetchWeather(city);
});
