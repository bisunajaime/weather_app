const time = document.querySelector('#time')
const API_KEY = "1a2373ea9a726deea1d6981b6e0166f9"
const city = document.querySelector('#city')
const degrees = document.querySelector('#degrees')
const weather_text = document.querySelector('#weather')
const weather_icon = document.querySelector('#weather_icon')
const as_of = document.querySelector('#as_of')
const cloudy_status = document.querySelector('#cloudy_status')
const humidity_status = document.querySelector('#humidity_status')
const wind_status = document.querySelector('#wind_status')
const weather_desc = document.querySelector('#weather_desc')
const searched_city = document.querySelector('#searched_city')
const search_btn = document.querySelector('#search_btn')
const others = document.querySelectorAll('.others')
const initial_location = "Manila"



const mapDataToHtml = response => {
    if (response.cod != 200) {
        alert('City not found')
        searched_city.value = ""
    } else {
        let {
            name,
            main,
            dt,
            weather,
            clouds,
            wind,
            cod,
            sys
        } = response
        let {
            temp
        } = main
        city.innerHTML = `${name}, ${sys.country}`
        degrees.innerHTML = `${temp}&deg;`
        weather_text.innerHTML = weather[0].main
        weather_icon.attributes.src.value = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`
        as_of.innerHTML = `${new Date(dt * 1000).toDateString()}`
        cloudy_status.innerHTML = `${clouds.all}%`
        humidity_status.innerHTML = `${main.humidity}%`
        wind_status.innerHTML = `${wind.speed} m/s`
        weather_desc.innerHTML = `${weather[0].description}`
    }


}
setInterval(() => {
    time.innerHTML = new Date().toLocaleTimeString();
}, 1000);
for (const cty of others) {
    console.log(cty)
    cty.addEventListener('click', () => {
        let toSearch = cty.innerHTML
        search_weather(toSearch)
    })
}

document.querySelector('input[type=text]').addEventListener('keydown', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        if (searched_city.value.length == 0) {
            alert('City not found')
            searched_city.value = ""
        } else {
            search_weather(searched_city.value)
            searched_city.value = ""
        }
    }
});

search_btn.addEventListener('click', () => {
    if (searched_city.value.length == 0) {
        alert('City not found')
        searched_city.value = ""
    } else {
        search_weather(searched_city.value)
        searched_city.value = ""
    }
})

const search_weather = (search) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(mapDataToHtml)
        .catch(() => alert('City not found'))
}