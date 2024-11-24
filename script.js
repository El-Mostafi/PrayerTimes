

// Set Hijri and Gregorian Dates
document.addEventListener("DOMContentLoaded", () => {
    const hijriDateElement = document.getElementById("hijri-date");
    const gregorianDateElement = document.getElementById("gregorian-date");

    // Example values (replace with dynamic data or API integration)
    const hijriDate = "10 Rabi' al-Thani 1446";
    const gregorianDate = new Date().toLocaleDateString();

    hijriDateElement.textContent = hijriDate;
    gregorianDateElement.textContent = gregorianDate;
});
 // Update city name based on selection
 document.getElementById("city").addEventListener("change", function() {
    const cityName = this.options[this.selectedIndex].text;
    document.getElementById("city-name").textContent = cityName;
    document.getElementById("title").textContent =`Accurate Prayer Times in ${cityName}`
});

function handleCityChange(selectElement) {
    const value = selectElement.value;
    if (value) {
        const [country, city] = value.split('|');
        getTimes(country, city);
    } else {
        alert("Please select a valid city.");
    }
}
function getTimes(country,city){
    console.log(country,city)
    const gregorianDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    axios.get(`http://api.aladhan.com/v1/timingsByCity/${gregorianDate}?city=${city}&country=${country}`)
    .then(response=>{
        let times= response.data.data;
        document.getElementById("Fajr").textContent=times.timings.Fajr;
        document.getElementById("Sunrise").textContent=times.timings.Sunrise;
        document.getElementById("Dhuhr").textContent=times.timings.Dhuhr;
        document.getElementById("Asr").textContent=times.timings.Asr;
        document.getElementById("Maghrib").textContent=times.timings.Maghrib;
        document.getElementById("Isha").textContent=times.timings.Isha;
        document.getElementById("hijri-date").textContent=`  ${times.date.hijri.weekday.ar} ${times.date.hijri.day} ${times.date.hijri.month.ar}`;
    })
    .catch((error) => {
        console.error("Error fetching prayer times:", error);
    });

}
getTimes("MA","casablanca");