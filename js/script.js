var APPID = "&APPID=5b249cc904f62fc89ca1e8d767844c39";
var img;
var townName = document.getElementById("townName");
var temperature = document.getElementById("temperature");
var country;
var miasto;
var localCity =document.getElementById("city");


//show acctual date
function showDate(){
    let today = new Date();
    
    let day = today.getDate();
    let weekDay = today.getDay(); //0-6 starting from sunday
    let mounth = today.getMonth() + 1; //0-11 +1
    let year = today.getFullYear();
    
    let weekDayTable = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    
    if (mounth < 10){ //add 0 b4 mounth number
        mounth = `0${mounth}`;
    }
    for (var i=0; i< weekDayTable.length; i++){
            if (weekDay == i){
            var dzien = weekDayTable[i]   
            }
    }
   /* var dzien = weekDayTable[weekDay];*/
    
    let all = `${dzien}, ${day} ${mounth} ${year}`;
    var data = document.getElementById("data");
    
    data.innerHTML = all;
}

showDate();//show date

function updateByCity(localCity) { /*Local city*/
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+ localCity +"&APPID=5b249cc904f62fc89ca1e8d767844c39";

    zapytanie(url);
}
/*local city API*/
function zapytanie(){
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var cityy = {};
            /*weather.townName = data.name;
            weather.temperature = Math.round(data.main.temp - 273.15);*/
            cityy.localCity = data.city;
           /* var cityTest = cityy.localCity;*/
            
//            console.log(cityy.localCity);
            updateE(cityy);
            
        }
    };
xhr.open("GET", "http://ip-api.com/json/", true);
xhr.send();

}

/*Looking for city */  
function updateByZipCode(miasto) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+ miasto +"&APPID=5b249cc904f62fc89ca1e8d767844c39";

    sendRequest(url);
}

/*Looking for city API */  
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

function updateE(cityy){//test
    
        localCity.value = cityy.localCity; //test miasta lokalnego
        localCity = cityy.localCity;
        console.log(localCity);
}

function update(weather) {
    townName.innerHTML = weather.townName;
    temperature.innerHTML = weather.temperature;

    console.log(weather.temperature);
    
    /*color changer */
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



$(document).ready(function() {
  $('#button').click(function() {
    var term = $('#city').val();
      updateByZipCode(term);
  });
});



window.onload = function () {
    
    updateByCity();
//    updateByZipCode(localCity);

}