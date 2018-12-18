import './styles/index.css';

document.getElementById('button').addEventListener('click', getWeather);

function getWeather() {
    let input = document.getElementById("searchInput").value;
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=3204627b3e52bb95c80ab6eef554e476`)
        .then(res => {
            if (res.ok) return res.json();
            else return Promise.reject(res);
        })
        .then(res => {
            console.log(res);
            displayWeather(res);
        })
        .catch(err => {
            if (err.status === 404) {
                console.log("Błąd, żądany adres nie istnieje");
            }
        })
}

function getWeatherByCoords(coords) {
    let input = document.getElementById("searchInput").value;
    fetch(`https://samples.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}`)
        .then(res => {
            if (res.ok) return res.json();
            else return Promise.reject(res);
        })
        .then(res => {
            console.log(res);
            displayWeather(res);
        })
        .catch(err => {
            if (err.status === 404) {
                console.log("Błąd, żądany adres nie istnieje");
            }
        })
}

function displayWeather(res) {
    var cityName = document.getElementById("cityName");
    var currentTemp = document.getElementById("currentTemp");
    var currentWeather = document.getElementById("currentWeather");
    var currentPressure = document.getElementById("currentPressure");
    var currentHumidity = document.getElementById("currentHumidity");
    var day = document.getElementsByClassName("day");

    cityName.innerHTML = res.city.name;
    currentTemp.innerHTML = `Temperature: ${Math.round(res.list[0].main.temp)} °C`;
    currentWeather.innerHTML = `Weather: ${res.list[0].weather[0].description}`;
    currentPressure.innerHTML = `Pressure: ${res.list[0].main.pressure} hPa`
    currentHumidity.innerHTML = `Humidity: ${res.list[0].main.humidity} %`
    let t;
    let k;

    switch (res.list[0].dt_txt.substr(11)) {
        case "00:00:00":
            t =4;
            k = 0;
            break;
        case "03:00:00":
            t = 3;
            k = 0;
            break;
        case "06:00:00":
            t = 2;
            k =0;
            break;
        case "09:00:00":
            t =1;
            k = 0;
            break;
        case "12:00:00":
            t = 0;
            k = 0;
            break;
            //zrobic/////////////////////////////////////////////////////////
        case "15:00:00":
            t = 7;
            k = 5;
            break;
        case "18:00:00":
            t = 6;
            k = 6;
            break;
        case "21:00:00":
            t = 5;
            k = 7;
            break;
    }

    for (let i = 0; i < day.length; i++) {
        day[i].children[0].innerHTML = res.list[k].dt_txt.substr(0, 10);
        day[i].children[1].innerHTML = `Temperature: <span>${Math.round(res.list[t].main.temp)}°C </span>`;
        day[i].children[2].innerHTML = `/ <span>${Math.round(res.list[t+4].main.temp)}°C</span>`;
        day[i].children[3].innerHTML = `Wind: ${Math.round(res.list[0].wind.speed)} m/s`;
        t += 8;
        k += 8;
    }
}