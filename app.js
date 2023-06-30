const today = document.getElementById('today') 
const fajr = document.getElementById('fajr') 
const sunrise = document.getElementById('sunrise') 
const dhuhr = document.getElementById('dhuhr') 
const asr = document.getElementById('asr') 
const maghrib = document.getElementById('maghrib') 
const isha = document.getElementById('isha') 


window.onload = async function () {
  await fetch("https://api.aladhan.com/v1/timingsByCity?country=SA&city=Makkah")
  .then(async (res) => {
    return await res.json();
  })
  .then(async (JSONData) => {
    const times = await JSONData.data
    return times
  })
  .then(async (data) => {
    console.log(data)
    const day = data.date.hijri.weekday.ar
    const fullDate = data.date.gregorian.date
    today.innerHTML = `${day} ${fullDate}`
    fajr.innerHTML = data.timings.Fajr;
    sunrise.innerHTML = data.timings.Sunrise;
    dhuhr.innerHTML = data.timings.Dhuhr;
    asr.innerHTML = data.timings.Asr;
    maghrib.innerHTML = data.timings.Maghrib;
    isha.innerHTML = data.timings.Isha;
  })

}


