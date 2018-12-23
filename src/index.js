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
            document.getElementById("searchInput").style.backgroundColor = "rgb(255, 255, 255)";
            document.getElementById("errorMessage").style.display = "none";
            displayWeather(res);
        })
        .catch(err => {
            if (err.status === 404) {
                console.log("Błąd, żądany adres nie istnieje");
                document.getElementsByClassName("container")[0].style.display = "none";
                console.log(document.getElementById("searchInput"));
                document.getElementById("searchInput").style.backgroundColor = "rgba(255, 65, 54, 0.4)";
                document.getElementById("errorMessage").style.display = "block";
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
    currentPressure.innerHTML = `Pressure: ${Math.round(res.list[0].main.pressure)} hPa`;
    currentHumidity.innerHTML = `Humidity: ${res.list[0].main.humidity} %`;
    let t;

    document.getElementsByClassName("container")[0].style.display = "grid";

    switch (res.list[0].dt_txt.substr(11)) {
        case "00:00:00":
            t = 4;
            break;
        case "03:00:00":
            t = 3;
            break;
        case "06:00:00":
            t = 2;
            break;
        case "09:00:00":
            t = 1;
            break;
        case "12:00:00":
            t = 0;
            break;
        case "15:00:00":
            t = 7;
            break;
        case "18:00:00":
            t = 6;
            break;
        case "21:00:00":
            t = 5;
            break;
    }

    if (t <= 4) {

        if (t = 4) {
            for (let i = 0; i < day.length - 1; i++) {
                day[i].children[0].innerHTML = res.list[t].dt_txt.substr(0, 10);
                day[i].children[1].innerHTML = `<span>${Math.round(res.list[t].main.temp)}°C </span>`;
                day[i].children[2].innerHTML = ` / <span>${Math.round(res.list[t+4].main.temp)}°C</span>`;
                day[i].children[3].innerHTML = `${Math.round(res.list[t+4].wind.speed)} m/s`;
                t += 8;
            }
            day[4].children[0].innerHTML = res.list[t].dt_txt.substr(0, 10);
            day[4].children[1].innerHTML = `<span>${Math.round(res.list[t].main.temp)}°C </span>`;
            day[4].children[2].innerHTML = ` / <span>${Math.round(res.list[t+3].main.temp)}°C</span>`;
            day[4].children[3].innerHTML = `${Math.round(res.list[t].wind.speed)} m/s`;
        } else {
            for (let i = 0; i < day.length; i++) {
                day[i].children[0].innerHTML = res.list[t].dt_txt.substr(0, 10);
                day[i].children[1].innerHTML = `<span>${Math.round(res.list[t].main.temp)}°C </span>`;
                day[i].children[2].innerHTML = ` / <span>${Math.round(res.list[t+4].main.temp)}°C</span>`;
                day[i].children[3].innerHTML = `${Math.round(res.list[t].wind.speed)} m/s`;
                t += 8;
            }
        }
    } else {
        day[0].children[0].innerHTML = res.list[0].dt_txt.substr(0, 10);
        day[0].children[2].innerHTML = `<span>${Math.round(res.list[t - 4].main.temp)}°C</span>`;
        day[0].children[3].innerHTML = `${Math.round(res.list[0].wind.speed)} m/s`;
        for (let i = 1; i < day.length; i++) {
            day[i].children[0].innerHTML = res.list[t].dt_txt.substr(0, 10);
            day[i].children[1].innerHTML = `<span>${Math.round(res.list[t].main.temp)}°C </span>`;
            day[i].children[2].innerHTML = ` / <span>${Math.round(res.list[t + 4].main.temp)}°C</span>`;
            day[i].children[3].innerHTML = `${Math.round(res.list[t].wind.speed)} m/s`;
            t += 8;
        }
    }
}