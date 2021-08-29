const apiKey = "e4ee3ebb63149069654603d67364a833";
const cityInput = document.querySelector(".search-bar");
const cityField = document.querySelector(".city");
const tempField = document.querySelector(".temp");
const minmaxField = document.querySelector(".min-max");
const timeField = document.querySelector(".time");
const iconField = document.querySelector(".icon");
const descriptionField = document.querySelector(".description");
const humidityField = document.querySelector(".humidity");
const windField = document.querySelector(".wind");

//Blank Data
function normalValue() {
    cityField.innerText = "- - - -";
    tempField.innerText = "- -°C";
    minmaxField.innerText = "--°C / --°C";
    timeField.innerText = `--:--:--`;
    descriptionField.innerText = "- - - -";
    humidityField.innerText = "Humidity: - -%";
    windField.innerText = "Wind Speed: - - km/h";
}
const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    //Async Await
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    }
    catch (error) {
        if (cityInput.value != "") {
            alert(`No city found for "${cityInput.value}"!`)
            normalValue();
            cityInput.value = "";
        }
    }
}
function displayWeather(data) {
    const { name, timezone } = data;
    const { icon, main } = data.weather[0];
    const { temp, humidity, temp_min, temp_max } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;
    const utcTime = timezone / 3600;

    cityField.innerText = `${name}, ${country}`;
    tempField.innerText = `${temp}°C`
    minmaxField.innerText = `${temp_min}°C/${temp_max}°C`;
    iconField.src = `https://www.openweathermap.org/img/wn/${icon}@2x.png`;
    descriptionField.innerText = main;

    // console.log(parseInt(date.getUTCHours() + utcTime));
    function getTime() {
        const date = new Date();
        const hours = date.getUTCHours() + utcTime;
        const minutes = date.getMinutes();
        timeField.innerText = (`${parseInt(hours)}:${parseInt(minutes)}`);
    }
    setInterval(getTime(), 1000);
    humidityField.innerText = `Humidity: ${humidity}%`;
    windField.innerText = `Wind Speed: ${speed} km/h`;

    cityInput.value = "";
    document.body.style.background = `url(https://source.unsplash.com/1600x900/?${main})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
}
//Search by Enter
cityInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        document.querySelector(".search-btn").click();
    }
});