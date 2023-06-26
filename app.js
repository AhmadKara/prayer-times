const params = {
  country: "SA",
  city: "Makkah"
}

axios.get('http://api.aladhan.com/v1/timingsByCity', {
  params: params
})
  .then(function (response) {
    const timing = response.data.data.timings
    setTimes('fajr', timing.Fajr)
    setTimes('shoroq', timing.Sunrise)
    setTimes('duhr', timing.Dhuhr)
    setTimes('asr', timing.Asr)
    setTimes('maghrib', timing.Sunset)
    setTimes('isha', timing.Isha)
    const readable = response.data.data.date.gregorian.date
    const weekday = response.data.data.date.hijri.weekday.ar
    const fulldate = `${weekday} ${readable}`
    setTimes('today', fulldate)
    console.log(response.data.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

function setTimes(id, time) {
  document.getElementById(id).innerHTML = time
}