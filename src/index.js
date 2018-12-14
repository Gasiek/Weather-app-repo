// import "./index.css";
//create element
// var newDiv = document.createElement('div');
// newDiv.className = 'hello';
// newDiv.setAttribute('title', 'Hello div');
// var newDivText = document.createTextNode('Hello World');
// newDiv.appendChild(newDivText);

// var container = document.querySelector('body .container');
// container.insert
// console.log(newDiv);

// var button = document.getElementById('button').addEventListener('click', buttonClick);

// function buttonClick(e){
// console.log(e)
// }

// var button = document.getElementById('button').addEventListener('mousedown', runEvent);

// function runEvent(e){
//     console.log(e.target.value)
// }
// var itemInput = document.querySelector('input');
// var form = document.querySelector('form');

// form.addEventListener('submit', runEvent);

// var form = document.getElementById('addForm');

// form.addEventListener('submit', addItem);

// function addItem(e) {
//     e.preventDefault();
//     var newItem = document.getElementById('item').value;

//     var li = document.createElement('li');

//     li.className = 'dailyWeather';

//     li.appendChild(document.createTextNode(newItem));
// }

document.getElementById('button').addEventListener('click', getWeather);

function getWeather(){
    let cityName = document.getElementById("searchInput").value;
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=3204627b3e52bb95c80ab6eef554e476`)
        .then(res => {
            if (res.ok) return res.json();
            else return Promise.reject(res);
            })
        .then(res => {
            console.log(res);
            //displayWeather(res);
        })
        .catch(err => {
            if(err.status === 404) {
                console.log("Błąd, żądany adres nie istnieje");
            }
        })
}

function getWeatherByCoords(coords) {
    let cityName = document.getElementById("searchInput").value;
    fetch(`https://samples.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}`)
        .then(res => {
            if (res.ok) return res.json();
            else return Promise.reject(res);
        })
        .then(res => {
            console.log(res);
            //displayWeather(res);
        })
        .catch(err => {
            if (err.status === 404) {
                console.log("Błąd, żądany adres nie istnieje");
            }
        })


}