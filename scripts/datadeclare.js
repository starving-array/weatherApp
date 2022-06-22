let api_key = "df3de09c00e1628d5edc373873919080";

// by city
let searchButton = document.querySelector("#search"); // search button

let locationStoreByCity = JSON.parse(localStorage.getItem("location")) || {
  lat: 46.7406,
  lon: 12.2797,
  name: "Sutahata",
  country: "IN",
}; // to capture position from gro detect or url1== get data in backend

let lon = locationStoreByCity.lon;
let lat = locationStoreByCity.lat;

function mapCall() {
  // //map
  // setTimeout(function () {
  //   let iframe = document.getElementById("gmap_canvas");
  //   iframe.src = `https://maps.google.com/maps?q=${locationStoreByCity.name}&t=k&z=13&ie=UTF8&iwloc=&output=embed`;
  // }, 100);
  // window.location.reload();
}

// mapCall(); // show map at start // first load

// geo location detection =================================================>

// moonrise moonset sunrise sunset
// clouds, rain*100 %, humidity
// temp.day temp.eve max min morn night
// weather[0] => description,  main=>rain
// wind speed=> wind_deg, wind_speed, uvi

// geo location detection =================================================>

// variable declare
let sevenDays = JSON.parse(localStorage.getItem("sevenDaysData")) || []; //array
let fortyEightHourSData = JSON.parse(localStorage.getItem("fortyEight")) || []; //array
let currentData = JSON.parse(localStorage.getItem("currentData")) || []; //object

// start with lon and lat from here
// start with lon and lat from here
// display data//////////////////////////////////

// data get by city ==> lat and lon
let locationDetect = document.querySelector("#detectLocation");

locationDetect.addEventListener("click", getGeoLocation);

async function getGeoLocation() {
  try {
    navigator.geolocation.getCurrentPosition(success);
    function success(position) {
      mapCall();
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      geoLocationName(lon, lat);
      // console.log(locationStoreByCity, "now");
    }
  } catch (error) {
    console.log(error);
  }
}
async function geoLocationName(lon, lat) {
  try {
    let url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api_key}`;
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data[0].country);
    let name = data[0].name;
    let country = data[0].country;
    locationStoreByCity = {
      lon: lon,
      lat: lat,
      name: name,
      country: country,
    };
    // mapCall();
    localStorage.setItem("location", JSON.stringify(locationStoreByCity));
    // window.location.reload();
    getMasterSevenData();
  } catch (error) {
    console.log(error);
  }
}

let idActive;

searchButton.addEventListener("keydown", function (e) {
  // getLatLon();
  // decounce
  //debounce
  if (e.key == "Enter") {
    getLatLon();
  }
});

async function getLatLon() {
  try {
    let inputSearch = document.querySelector("#search");
    // console.log(inputSearch.value);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=${api_key}`;
    let responce = await fetch(url); // return promise success
    let citydata = await responce.json();
    // console.log(citydata);
    let name = citydata.name;
    let country = citydata.sys.country;
    lat = citydata.coord.lat;
    lon = citydata.coord.lon;
    locationStoreByCity = {
      lon: lon,
      lat: lat,
      name: name,
      country: country,
    };
    localStorage.setItem("location", JSON.stringify(locationStoreByCity));
    getMasterSevenData();

    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

getMasterSevenData();
//   currentBox(currentData);

// variable with localstorage connect
// to capture position from gro detect or url1== get data in backend
// console.log(lat, lon);

// display data appending============================================================>
// function displayMinuteBox(data) {
//   // somewhere to append and to clear before every call
//   data.forEach(function (elem, index) {
//     // create box and pass data form minute database
//   });
// }

// hourlyUpdate(fortyEightHourSData);

// displaySevenDays(sevenDays);
// sunset sunrise, moon set etc=============================
// map
// current data called
// current data called
// currentBox(currentData);

// function display call

function backgroundPic(timeCheck) {
  let body = document.querySelector("#background");

  // sunrise = dateCovertion(sunrise);
  // sunrise = sunrise.getHours();

  // sunset = dateCovertion(sunset);
  // sunset = sunset.getHours();

  //   timeCheck = 11;
  // timeCheck = 20;
  // console.log(timeCheck)
  // timeCheck = 3;

  if (timeCheck <= 3 || timeCheck >= 21) {
    body.style.backgroundImage = 'url("./imageW/beachnight.jpg")';
  } else if (timeCheck >= 19 && timeCheck <= 21) {
    body.style.backgroundImage = 'url("./imageW/parlamentnight.jpg")';
    // night
  } else if (timeCheck >= 17) {
    // evening
    body.style.backgroundImage = 'url("./imageW/eveningW.jpg")';
  } else if (timeCheck >= 15) {
    //afternoon
    body.style.backgroundImage = 'url("./imageW/beachStone.jpg")';
  } else if (timeCheck >= 10) {
    //background day
    body.style.backgroundImage = 'url("./imageW/daysqui.jpg")';
    // body.style.backgroundImage = 'url("./imageW/m/beforesunrise.jpg")';
  } else if (timeCheck >= 8) {
    body.style.backgroundImage = 'url("./imageW/beach.jpg")';
  } else if (timeCheck >= 5) {
    //background sunrise
    body.style.backgroundImage = 'url("./imageW/sunrise.jpg")';
  }
  // backgroundImageStat = true;
  // backgroundImageURL = body.style.backgroundImage;
  // console.log(backgroundImageURL);
  // localStorage.setItem("background", JSON.stringify(backgroundImageStat));
  // localStorage.setItem("backgroundURL", JSON.stringify(backgroundImageURL));
}

// extra functions =======================================================================>

function whichDayInWeek(dateGetData) {
  let weekNo = dateGetData.getDay(); // no in week
  let today = currentDay(); // get current date

  if (dateGetData.getDate() == today.getDate()) {
    weekNo = "Today";
  } else {
    weekNo = dayName(weekNo);
  }
  return weekNo;
}

// month name

function monthName(val) {
  let obj = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  return obj[val];
}

// return dayName
function dayName(val) {
  let obj = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  return obj[val];
}

// date to local convert
function dateCovertion(timeVal) {
  let day = new Date(timeVal * 1000);
  return day;
}

// 1-7
function currentDay() {
  let day = new Date();
  return day;
}
// console.log(currentDay())

// time update
function timeNowUpdate() {
  let time = new Date();
  return time;
}
//background picture

if (sevenDays.length > 0) {
  sunRiseMoonRise(sevenDays[0]);
}

// get data =============================
// get data ============================= of all current seven days 24 hours
async function getMasterSevenData() {
  try {
    let masterUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    let responceMaster = await fetch(masterUrl);
    let masterData = await responceMaster.json();
    sevenDays = masterData.daily;
    fortyEightHourSData = masterData.hourly;
    currentData = masterData.current;
    localStorage.setItem("sevenDaysData", JSON.stringify(sevenDays));
    localStorage.setItem("fortyEight", JSON.stringify(fortyEightHourSData));
    localStorage.setItem("currentData", JSON.stringify(currentData));
    hourlyUpdate(fortyEightHourSData);
    displaySevenDays(sevenDays);
    currentBox(currentData);
    mapCall();
    sunRiseMoonRise(sevenDays[0]);

    // window.location.reload(); // bug
  } catch (error) {
    console.log(error);
  }
}

// display function ================================================>
// display function ================================================>

function sunRiseMoonRise({ sunrise, sunset }) {
  document.getElementById("sunrises").innerHTML = "";

  sunrise = dateCovertion(sunrise);
  sunrise = sunrise.toLocaleTimeString();
  sunset = dateCovertion(sunset);
  sunset = sunset.toLocaleTimeString();

  // sunrise=================================
  let sunriseSpan = document.createElement("div");
  let imageSunrise = document.createElement("img");
  imageSunrise.src = "./images/sunrise.png";
  let sunriseTExt = document.createElement("span");
  sunriseTExt.innerText = sunrise;

  sunriseSpan.append(imageSunrise, sunriseTExt);

  //sunset =========================================
  let sunsetSpan = document.createElement("div");
  let imageSunset = document.createElement("img");
  imageSunset.src = "./images/sunset.png";
  let sunsetText = document.createElement("span");
  sunsetText.innerText = sunset;
  sunsetSpan.append(imageSunset, sunsetText);

  document.getElementById("sunrises").append(sunriseSpan, sunsetSpan);
}

function hourlyUpdate(data) {
  let hourlyUpdate = document.getElementById("hourlyUpdate");
  hourlyUpdate.innerHTML = null;
  data.forEach(function ({ dt, temp, weather }) {
    let box = document.createElement("div");
    box.setAttribute("class", "boxHourDiv");

    let d = new Date(dt * 1000);
    let getTimeUpdate = d.toLocaleTimeString();
    let one = getTimeUpdate.split(":");
    let timeUpdate = `${one[0]}${one[one.length - 1]
      .split(" ")[1]
      .toUpperCase()}`; // 1am, 2am
    //  console.log(timeUpdate);

    let timeSpan = document.createElement("span");
    timeSpan.innerText = timeUpdate;
    // console.log(timeUpdate)

    let imgUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    let imageHour = document.createElement("img");
    imageHour.src = imgUrl;

    let degreeHour = document.createElement("span");
    degreeHour.innerText = temp;
    let degreeSym = document.createElement("span");
    degreeSym.innerText = "°";
    degreeHour.append(degreeSym);

    box.append(timeSpan, imageHour, degreeHour);
    hourlyUpdate.append(box);
  });
}

function displaySevenDays(data) {
  let sevenDaysDisplay = document.getElementById("sevenDaysUpdate");
  sevenDaysDisplay.innerHTML = null;

  data.forEach(function ({ dt, temp: { max, min }, weather }) {
    let box = document.createElement("div");
    box.setAttribute("class", "sevenDayDiv");

    //date
    let dateGetData = dateCovertion(dt);
    let monthNameVal = dateGetData.getMonth(); //month name
    let dateNameVal = dateGetData.getDate(); // date 1-31

    let dayInWeekSpan = document.createElement("span");
    dayInWeekSpan.innerText = whichDayInWeek(dateGetData); // yesterDay

    //dayInWeekSpan============================================

    // month and date
    let monthSpanDay = document.createElement("span");
    let monthSpan = document.createElement("span");
    monthSpan.innerText = monthName(monthNameVal);
    let dateSpan = document.createElement("span");
    dateSpan.innerText = dateNameVal;
    monthSpanDay.append(monthSpan, dateSpan);

    //monthSpanDay====================================================

    //weather image
    // imageIcon==================================================
    let imageIcon = document.createElement("img");
    imageIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    // weatherSpan====================================================
    let weatherSpan = document.createElement("span");
    weatherSpan.innerText = weather[0].description;

    // min max day night
    let maxSpan = document.createElement("span");
    maxSpan.innerText = `Max- ${max}°`;
    let minSpan = document.createElement("span");
    minSpan.innerText = `Min- ${min}°`;

    box.append(
      dayInWeekSpan,
      monthSpanDay,
      imageIcon,
      weatherSpan,
      maxSpan,
      minSpan
    );
    sevenDaysDisplay.append(box);
  });
}

function currentBox(data) {
  document.querySelector("#current").innerHTML = "";

  //container box for current temp
  // data is object here
  let box = document.createElement("div");
  box.setAttribute("id", "boxCurrent");

  // current temp // grid 1fr col====================================

  let leftSide = document.createElement("div");
  leftSide.setAttribute("id", "leftSide");
  //1
  let cityName = document.createElement("span");
  cityName.setAttribute("id", "cityName");
  cityName.innerText = locationStoreByCity.name;
  let tempNow = document.createElement("span");
  tempNow.setAttribute("id", "tempNow");
  tempNow.innerText = data.temp;
  let degreeTemp = document.createElement("span");
  degreeTemp.innerText = "°";
  tempNow.append(degreeTemp);

  // weather status
  let weatherS = document.createElement("span");
  weatherS.setAttribute("id", "weatherS");
  weatherS.innerText = data.weather[0].main; // clouds// rains

  leftSide.append(cityName, tempNow, weatherS);

  //rightside grid 1fr col==============================
  //outer box
  let rightSide = document.createElement("div");
  rightSide.setAttribute("id", "rightSide");
  // inner box
  let humidityC = document.createElement("div");
  humidityC.setAttribute("class", "humiditySBox");

  //1 humidity
  //   let imgUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  let humidityImg = document.createElement("img");
  humidityImg.src = "./images/umbrella.png"; //

  let humidityText = document.createElement("span");
  humidityText.setAttribute = ("class", "humiditySpan");
  humidityText.innerText = `${data.dew_point}%`;

  // mini box append
  humidityC.append(humidityImg, humidityText);

  let mainC = document.createElement("div");
  mainC.setAttribute("class", "humiditySBox");
  //2 weather

  let weatherMainImg = document.createElement("img");
  weatherMainImg.src = "./images/temperature.png";
  let weatherMainText = document.createElement("span");
  weatherMainText.setAttribute = ("class", "humiditySpan");
  weatherMainText.innerText = `${data.feels_like}%`; // need to read rain data
  // mini box append
  //   console.log(data.weather[0].main.toLowerCase());
  mainC.append(weatherMainImg, weatherMainText);

  rightSide.append(humidityC, mainC);

  //main box append finish
  box.append(leftSide, rightSide);

  document.querySelector("#current").append(box);
}

// let backgroundImageStat = JSON.parse(localStorage.getItem("background")) || "";
// clock display
setInterval(function () {
  let timeCheck = timeNowUpdate();
  document.getElementById("CurrentTIme").innerText =
    timeCheck.toLocaleTimeString();

  backgroundPic(timeCheck.getHours());
  // if (backgroundImageStat == "") {
  //   console.log(backgroundImageStat);
  // }
  // if (
  //   h == 3 ||
  //   h == 21 ||
  //   h == 19 ||
  //   h == 17 ||
  //   h == 15 ||
  //   h == 10 ||
  //   h == 8 ||
  //   h == 5
  // ) {
  //   backgroundPic(sevenDays[0], h);
  // }
}, 1000);
