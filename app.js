/* const apiKey = "e4ee3ebb63149069654603d67364a833";
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
/* 
const success = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude + longitude)
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b051fdf58c204edf9e8399ba63882135`)
        .then(response => response.json())
        .then(data => {
            const cityName = data.results[0].components.city;
        })
}
const error = () => {
    console.log("Unable to detect the location!")
}
navigator.geolocation.getCurrentPosition(success, error); */

const apiKey = "e4ee3ebb63149069654603d67364a833";
const cityInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const cityField = document.querySelector("#city");
const tempField = document.querySelector("#temp");
const minMaxField = document.querySelector("#min-max");
const timeField = document.querySelector("#time");
const iconField = document.querySelector("#icon");
const descriptionField = document.querySelector("#description");
const humidityField = document.querySelector("#humidity");
const windField = document.querySelector("#wind");

//Getting current location
const success = async position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b051fdf58c204edf9e8399ba63882135`);
    const data = await response.json();
    const cityName = data.results[0].components.city;
    displayNormalData(cityName);
}
const error = () => {
    console.log("Unable to detect the location!")
}
navigator.geolocation.getCurrentPosition(success, error);
//Displaying normal data
const displayNormalData = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const { name } = data;
    const { country } = data.sys;
    const { temp, temp_max, temp_min, humidity } = data.main;
    const { icon, main } = data.weather[0];
    const { speed } = data.wind;

    cityField.innerText = `${name}, ${country}`;
    tempField.innerText = `${temp}°C`;
    minMaxField.innerText = `${temp_min}/${temp_max}`;

    setInterval(() => {
        let date = new Date();
        let time = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
        timeField.innerText = time;
    }, 1000);

    iconField.innerHTML = `
    <img src="https://www.openweathermap.org/img/wn/${icon}@2x.png" alt="" class="d-block mx-auto" id="icon">
    `;
    descriptionField.innerText = `${main}`;
    humidityField.innerText = `Humidity: ${humidity}`;
    windField.innerText = `Wind: ${speed} km/h`;
    cityInput.value = "";
}

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
});
//Showing results for search
const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        alert(`OOPS! No results found for "${cityInput.value}"`);
        cityInput.value = "";
        searchBtn.setAttribute("disabled", true);
    }
    const data = await response.json();
    const { name, timezone } = data;
    const { country } = data.sys;
    const { temp, temp_max, temp_min, humidity } = data.main;
    const { icon, main } = data.weather[0];
    const { speed } = data.wind;
    const utcHr = timezone / 3600;

    cityField.innerText = `${name}, ${country}`;
    tempField.innerText = `${temp}°C`;
    minMaxField.innerText = `${temp_min}/${temp_max}`;
    //------------------------------------------------------------
    setInterval(() => {
        let date = new Date();
        let time = `${date.getHours()+utcHr}: ${date.getMinutes()}: ${date.getSeconds()}`;
        timeField.innerText = time;
    }, 1000);

    iconField.innerHTML = `
    <img src="https://www.openweathermap.org/img/wn/${icon}@2x.png" alt="" class="d-block mx-auto" id="icon">
    `;
    descriptionField.innerText = `${main}`;
    humidityField.innerText = `Humidity: ${humidity}%`;
    windField.innerText = `Wind: ${speed} km/h`;
    cityInput.value = "";
    searchBtn.setAttribute("disabled", true);
}
//Disableing and Enableing the search button for empty field
const disableBtn = () => {
    //Search by enter button
    searchBtn.addEventListener("click", (event) => {
        event.preventDefault();
    });
    cityInput.addEventListener("keyup", function () {
        if (cityInput.value !== "") {
            searchBtn.removeAttribute("disabled");
        }
        else {
            searchBtn.setAttribute("disabled", true);
        }
    });
}
disableBtn();
