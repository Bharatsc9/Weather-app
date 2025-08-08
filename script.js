const apiKey = "360e47da702a82c3c3504a806826c0eb";

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const message = document.getElementById("message");
  const weatherBox = document.getElementById("weatherBox");
  // message.textContent = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    // console.log(data);

    document.getElementById("cityName").textContent = `Weather for ${city}`;

    document.getElementById("temp_main").textContent = `${data.main.temp} °C`;
    document.getElementById("feels_like").textContent = data.main.feels_like;
    document.getElementById("min_temp").textContent = data.main.temp_min;
    document.getElementById("max_temp").textContent = data.main.temp_max;
    document.getElementById("pressure").textContent = data.main.pressure;

    document.getElementById("humidity_main").textContent = `${data.main.humidity} %`;
    document.getElementById("lat").textContent = data.coord.lat;
    document.getElementById("lon").textContent = data.coord.lon;

    const formatTimezone = (seconds) => {
      const sign = seconds >= 0 ? "+" : "-";
      const abs = Math.abs(seconds);
      const hours = Math.floor(abs / 3600);
      const minutes = Math.floor((abs % 3600) / 60);
      return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    const getLocalTimeString = (offSetTime) => {
      const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
      const localTime = new Date(utc + offSetTime * 1000);
      return localTime.toLocaleTimeString();
    };

    document.getElementById("timezone").textContent = formatTimezone(data.timezone);
    document.getElementById("local_time").textContent = getLocalTimeString(data.timezone);

    document.getElementById("wind_main").textContent = `${data.wind.speed} Km/h`;
    document.getElementById("wind_deg").textContent = data.wind.deg;
    document.getElementById("condition").textContent = data.weather[0].main;

    // Convert UNIX timestamps for sunrise/sunset
    const formatTime = (unix) => {
      const date = new Date(unix * 1000);
      return date.toLocaleTimeString();
    };

    document.getElementById("sunrise").textContent = formatTime(data.sys.sunrise);
    document.getElementById("sunset").textContent = formatTime(data.sys.sunset);

    document.getElementById("placeholder").style.display = "none";
    document.getElementById("weatherCards").classList.remove("hidden");

    message.textContent = "";
  } catch (error) {
    // console.error("Error fetching weather:", error);
    weatherBox.classList.add("hidden");
    message.textContent = "❌ " + error.message;
  }
};

window.addEventListener("DOMContentLoaded", () =>{
  const lastCity = localStorage.getItem("lastCity");
  if(lastCity){    
    fetchWeather(lastCity);
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  localStorage.setItem("lastCity", city);
  fetchWeather(city);
});

const themeToggle = document.getElementById("themeToggle");

window.addEventListener("DOMContentLoaded", ()=>{
  const theme = localStorage.getItem("theme");
  if(theme === "dark"){
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
});

themeToggle.addEventListener("change", ()=>{
  if(themeToggle.checked){
    document.body.classList.add("dark");
    localStorage.setItem("theme","dark");
  }else{
    document.body.classList.remove("dark");
    localStorage.setItem("theme","light");
  }
});