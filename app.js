const today = document.getElementById("today");
const fajr = document.getElementById("fajr");
const sunrise = document.getElementById("sunrise");
const dhuhr = document.getElementById("dhuhr");
const asr = document.getElementById("asr");
const maghrib = document.getElementById("maghrib");
const isha = document.getElementById("isha");
const citiesForm = document.getElementById("cities");
const cityName = document.getElementById("city-name");

const cities = ["مكة المكرمة", "المدينة المنورة", "دمشق", "أبو ظبي", "دبي"];

for (let city of cities) {
    const option = `<option>${city}</option>`;
    citiesForm.innerHTML += option;
}

let country = "SA";
let city = "Makkah";

citiesForm.addEventListener("change", function () {
    cityName.innerHTML = this.value;
    if (this.value == "المدينة المنورة") {
        city = "Madinah";
        country = "SA";
    } else if (this.value == "دمشق") {
        city = "Damascus";
        country = "SY";
    } else if (this.value == "أبو ظبي") {
        city = "Abu Dhabi";
        country = "AE";
    } else if (this.value == "دبي") {
        city = "Dubai";
        country = "AE";
    }
    getDataFromAPI();
});

getDataFromAPI();

function getDataFromAPI() {
    fetch(`https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`)
        .then((res) => {
            return res.json();
        })
        .then((JSONData) => {
            const times = JSONData.data;
            return times;
        })
        .then((data) => {
            const day = data.date.hijri.weekday.ar;
            const fullDate = `${data.date.gregorian.date} / ${data.date.hijri.date}`;
            today.innerHTML = `${day} ${fullDate}`;
            fajr.innerHTML = data.timings.Fajr;
            sunrise.innerHTML = data.timings.Sunrise;
            dhuhr.innerHTML = data.timings.Dhuhr;
            asr.innerHTML = data.timings.Asr;
            maghrib.innerHTML = data.timings.Maghrib;
            isha.innerHTML = data.timings.Isha;
        })
}
