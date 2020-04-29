// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const feelslikeElement = document.querySelector(".feels-like");
const highandLowElement = document.querySelector(".HandL");
const humidityElement = document.querySelector(".humidity");
const windspeedElement = document.querySelector(".windspeed");
const countryElement = document.querySelector(".country");
const unitToggleElement = document.querySelector(".slider");
const appTitleElement = document.querySelector(".appTitle");
const darkModeToggle = document.querySelector('#dark-mode-toggle');

// DARK-MODE TOGGLE
let darkMode = localStorage.getItem('darkMode');

if (darkMode === 'enabled') {
  	enableDarkMode();
} else {
	disableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode'); 
  if (darkMode !== 'enabled') {
    enableDarkMode();  
  } else {  
    disableDarkMode(); 
  }
});

function enableDarkMode() {
   var element = document.body;
   element.classList.add("dark-mode");
   localStorage.setItem('darkMode', 'enabled');
   var emoji = document.getElementById("dark-mode-toggle");

    if (emoji.innerHTML ==="🌙") {
        emoji.innerHTML = "🔆";
    }   else {
        emoji.innerHTML = "🌙";
    }
}

function disableDarkMode() {
   var element = document.body;
   element.classList.remove("dark-mode");
   localStorage.setItem('darkMode', null );
   var emoji = document.getElementById("dark-mode-toggle");

    if (emoji.innerHTML ==="🌙") {
        emoji.innerHTML = "🔆";
    }   else {
        emoji.innerHTML = "🌙";
    }
}

// APP DATA
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "76b08d0791b1b13c3dae6866bef3e185";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>location is disabled in your browser</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN GEOLOCATION NOT AVAILABLE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>You denied permission :(</p><br><a href="" onclick="location.reload()">Reload</a>`;
}

// GET WEATHER FROM API
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.feelslike = Math.floor(data.main.feels_like - KELVIN);
            weather.highTemp = Math.floor(data.main.temp_max - KELVIN);
            weather.minTemp = Math.floor(data.main.temp_min - KELVIN);
            weather.humidity = data.main.humidity;
            weather.windspeed = data.wind.speed;

        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° C`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}`;
    countryElement.innerHTML = `${weather.country}`;
    feelslikeElement.innerHTML = `<i>feelslike <b>${weather.feelslike} °<span>C</span></b></i>`;
    highandLowElement.innerHTML = `H: <b>${weather.highTemp}°</b>, L: <b>${weather.minTemp}°</b>`;
    humidityElement.innerHTML = `Humidity: <b>${weather.humidity}%</b>`;
    windspeedElement.innerHTML = `Windspeed: <b>${weather.windspeed}</b> km/h`;
    appTitleElement.innerHTML = `Weather in ${weather.city}`;

}

// C to F
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// C to F TOGGLE SWITCH
unitToggleElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        let feelslike = celsiusToFahrenheit(weather.feelslike);
        fahrenheit = Math.floor(fahrenheit);

        let highTemp = celsiusToFahrenheit(weather.highTemp);
        fahrenheit = Math.floor(fahrenheit);

        let minTemp = celsiusToFahrenheit(weather.highTemp);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}° F`;
        feelslikeElement.innerHTML = `<i>feelslike <b>${feelslike}° F</b></i>`;
        highandLowElement.innerHTML = `H: <b>${highTemp}°</b>, L: <b>${minTemp}°</b>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}° C`;
        feelslikeElement.innerHTML = `<i>feelslike <b>${weather.feelslike}° C</b></i>`;
        highandLowElement.innerHTML = `H: <b>${weather.highTemp}°</b>, L: <b>${weather.minTemp}°</b>`;
        weather.temperature.unit = "celsius"
    }
});
// TIME FUNCTION
window.onload = function() {
  clock();  
    function clock() {
    var now = new Date();
    var TwentyFourHour = now.getHours();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mid = 'PM';
    if (min < 10) {
      min = "0" + min;
    }
    if (hour > 12) {
      hour = hour - 12;
    }    
    if(hour==0){ 
      hour=12;
    }
    if(TwentyFourHour < 12) {
       mid = 'AM';
    }     
  document.getElementById('currentTime').innerHTML =     hour+':'+min+':'+sec +' '+mid ;
    setTimeout(clock, 1000);
    }
}
