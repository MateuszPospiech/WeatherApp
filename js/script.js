var APPID = "5b249cc904f62fc89ca1e8d767844c39";
var img;
var townName = document.getElementById("townName");
var temperature = document.getElementById("temperature");


function updateByZipCode(zip) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "zip=" + zip + ",pl" + "&APPID=" + APPID;

    sendRequest(url);
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.townName = data.name;
            weather.temperature = Math.round(data.main.temp - 273.15);

            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function update(weather) {
    townName.innerHTML = weather.townName;
    temperature.innerHTML = weather.temperature;
        console.log(weather.temperature);
    
    function weatherCold(){
    document.getElementById("container").style.backgroundColor = "blue";
    }
    function weatherMiddle(){
    document.getElementById("container").style.backgroundColor = "yellow";
    }
    function weatherHot(){
    document.getElementById("container").style.backgroundColor = "red";
    }
    if (weather.temperature <= 0){
        weatherCold();
    }
    else if(weather.temperature > 0 && weather.temperature <15){
        weatherMiddle();}
    else {
        weatherHot();}
}

window.onload = function () {

    

    updateByZipCode("41-103");

}
