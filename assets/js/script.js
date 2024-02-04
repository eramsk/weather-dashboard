function initPage() {

//Variables
    
    var searchButton = $("#search-button");
    var cityList = $(".list-group");
    var weatherSearch = $(".weather-search");
    var todayId = $("#today");
    var forecastId = $("#forecast");
    var searchInput = $("#search-input");
    var historyEl = $("#history");
    var fiveDayHeader = $("#five-day");
    var city = [];

//store the cities in local storage
function storeCity(name){
    var savedCity = JSON.parse(localStorage.getItem("sCity")) || [] ;
    savedCity.push(name);
    localStorage.setItem("sCity",JSON.stringify(savedCity));
}

// loads the city list from local storage and calls api to get data for last searched city 
function loadCity() {
    var cityEl = JSON.parse(localStorage.getItem("sCity"));

    if (cityEl !== null) {
        cityList = cityEl;
    }

    renderButtons();

    if (cityList) {
        var thisCity = cityList[cityList.length - 1]
        currentWeather(city);
        forecast(cityid);
    }
}

//API KEY
var APIKey = "758974132e2e4da4f5697230761019a3"; 

//getting the data from from server
function currentWeather(city){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
    
        storeCity(response.name);

  // creating div to store all of the information for the current weather
  var todayWeather = $("<div class= 'card-body'>");
  todayWeather.addClass("border border-dark rounded");

  // Current City Name
  var currentCity = $(" <h3 id='city-name' class='city-name' align-middle>").text(response.name);
  todayWeather.append(currentCity);

   // TODAY'S DATE
   var todayDate = $("<p>");
   todayDate.text(moment().format('dddd, MMM Do YYYY'));
   todayWeather.append(todayDate);
   
   // Weather Icon for current day
   var weatherImg = response.weather[0].icon;
   var weatherIcon= $("<img id='weatherImg'>").attr("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
   weatherIcon.attr("alt", response.weather[0].description);
   todayWeather.append(weatherIcon);

   