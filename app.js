const today = document.getElementById('today');
const fajr = document.getElementById('fajr');
const sunrise = document.getElementById('sunrise');
const dhuhr = document.getElementById('dhuhr');
const asr = document.getElementById('asr');
const maghrib = document.getElementById('maghrib');
const isha = document.getElementById('isha');
const citiesForm = document.getElementById('cities');
const cityName = document.getElementById('city-name');

const cities = ["مكة المكرمة", "المدينة المنورة", "دمشق", "أبو ظبي", "دبي"];

for (let city of cities) {
  const option = `<option>${city}</option>`;
  citiesForm.innerHTML += option;
}

let country = "SA";
let city = "Makkah";

citiesForm.addEventListener("change", function() {
  cityName.innerHTML = this.value;
  switch (this.value) {
    case "المدينة المنورة":
      city = "Madinah";
      country = "SA";
      break;
    case "دمشق":
      city = "Damascus"
      country = "SY";
      break;
    case "أبو ظبي":
      city = "Abu Dhabi"
      country = "AE";
      break;
    case "دبي":
      city = "Dubai"
      country = "AE";
      break;
    default:
      city = "Makkah";
      country = "SA";
      break;
  }
  getDataFromAPI();
})

getDataFromAPI();

function getDataFromAPI() {
  fetch(`https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`)
  .then(async (res) => {
    return await res.json();
  })
  .then(async (JSONData) => {
    const times = await JSONData.data
    return times
  })
  .then(async (data) => {
    // console.log(data)
    const day = data.date.hijri.weekday.ar
    const fullDate = data.date.gregorian.date
    today.innerHTML = `${day} ${fullDate}`
    fajr.innerHTML = await data.timings.Fajr;
    sunrise.innerHTML = await data.timings.Sunrise;
    dhuhr.innerHTML = await data.timings.Dhuhr;
    asr.innerHTML = await data.timings.Asr;
    maghrib.innerHTML = await data.timings.Maghrib;
    isha.innerHTML = await data.timings.Isha;
  })
};