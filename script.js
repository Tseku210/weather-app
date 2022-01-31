const citySubmitBtn = document.getElementById('search-city-submit-btn')
const toggler = document.getElementById('toggler')

async function getWeatherData(location) {
    const weatherData = await (await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=91fbbfac43d30ca0935fb6f53c8d13b9`)).json()
    console.log(weatherData)
    if (weatherData.cod == "404") {
        throw new Error(weatherData.message)
    }
    return weatherData;

}

async function loadDefault() {
    displayLoading()
    const cityName = main.querySelector('.city-name')
    const cityTemp = main.querySelector('.temp')
    const unit = document.querySelector('.active').innerHTML;
    const weatherData = await getWeatherData('Ulaanbaatar')
    hideLoading()
    cityTemp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} ${unit}`
    cityName.innerHTML = weatherData.name;
    const weatherIcon = document.getElementById('weather-icon');
    const weatherIconValue = weatherData.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherIconValue}@4x.png`
}

function displayLoading() {
    const loader = document.getElementById('loading')

    loader.classList.add('display')

    setTimeout(() => {
        loader.classList.remove('display')
    }, 5000)
}

function hideLoading() {
    const loader = document.getElementById('loading')

    loader.classList.remove('display')
}

async function displayWeather() {
    displayLoading()
    const cityInput = document.getElementById('search-city-input')
    const main = document.getElementById('main');
    const cityName = main.querySelector('.city-name')
    const cityTemp = main.querySelector('.temp')
    const unit = document.querySelector('.active').innerHTML;

    const weatherData = await getWeatherData(cityInput.value)
    hideLoading()
    cityTemp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} ${unit}`
    cityName.innerHTML = weatherData.name;

    const weatherIcon = document.getElementById('weather-icon');
    const weatherIconValue = weatherData.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherIconValue}@4x.png`
}

function changeUnitTo(unit) {
    const cityTemp = main.querySelector('.temp')
    if (unit === '°C') {
        cityTemp.innerHTML = `${Math.round((Number(cityTemp.innerHTML.split(' ')[0]) -32) * 5/9)} ${unit}`
    } else if (unit === '°F') {
        cityTemp.innerHTML = `${Math.round((Number(cityTemp.innerHTML.split(' ')[0]) * 9/5) + 32)} ${unit}`
    }
}

loadDefault()

citySubmitBtn.addEventListener('click', async () => {
    displayWeather()
})

toggler.addEventListener('click', () => {
    const [fahr, cels] = document.querySelectorAll('.toggleIcon')
    if (fahr.classList.contains('active')) {
        fahr.classList.remove('active')
        cels.classList.add('active')
        changeUnitTo(cels.innerHTML)
    } else if (cels.classList.contains('active')) {
        cels.classList.remove('active')
        fahr.classList.add('active')
        changeUnitTo(fahr.innerHTML)
    }
})

