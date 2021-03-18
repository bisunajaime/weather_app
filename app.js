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
// mobile
const mobile_weather = document.querySelector('#mobile_weather')
const mobile_country = document.querySelector('#mobile_country')
const mobile_time = document.querySelector('#mobile_time')
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
        let currentTime = `${new Date(dt * 1000).toDateString()}`
        city.innerHTML = `${name}, ${sys.country}`
        degrees.innerHTML = `${temp}&deg;`
        weather_text.innerHTML = weather[0].main
        weather_icon.attributes.src.value = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`
        as_of.innerHTML = currentTime
        cloudy_status.innerHTML = `${clouds.all}%`
        humidity_status.innerHTML = `${main.humidity}%`
        wind_status.innerHTML = `${wind.speed} m/s`
        weather_desc.innerHTML = `${weather[0].description}`

        mobile_country.innerHTML = `${name}, ${sys.country}`
        mobile_weather.innerHTML = weather[0].main + ' ' + `${temp}&deg;`
        mobile_time.innerHTML = currentTime
    }
}

const refreshRecents = () => {
    const others = document.querySelectorAll('.others')
    for (const cty of others) {
        cty.addEventListener('click', () => {
            let toSearch = cty.innerHTML
            search_weather(toSearch)
        })
    }
}
const appendElemToList = text => {
    const recent_searches = document.querySelectorAll('.others')
    const other_places = document.querySelector('#other_places')
    console.log(recent_searches.length)
    const node = document.createElement('span')
    let textNode = document.createTextNode(text)
    node.appendChild(textNode)
    node.setAttribute('class', 'others')
    console.log(node)
    other_places.insertBefore(node, other_places.children[0])
    refreshRecents()

    if (recent_searches.length >= 5) {
        // other_places.appendChild(node)
        other_places.removeChild(other_places.childNodes[other_places.children.length])
    }
}

setInterval(() => {
    time.innerHTML = new Date().toLocaleTimeString();
}, 1000);


document.querySelector('input[type=text]').addEventListener('keydown', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        if (searched_city.value.length == 0) {
            alert('City not found')
            searched_city.value = ""
        } else {
            search_weather(searched_city.value)
            appendElemToList(searched_city.value)
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
        appendElemToList(searched_city.value)
        searched_city.value = ""
    }
})

const search_weather = (search) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(mapDataToHtml)
        .catch(() => alert('City not found'))
}