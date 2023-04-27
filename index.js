const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error = document.querySelector('.not-found')

//event listener to serach in the API when click in the search button
search.addEventListener('click', () => {

    const APIkey = 'cf8e87c0477ef14a31fffde6153eb8d1'
    // selecting the value from the text input
    const city = document.querySelector('.search-box input').ariaValueMax

    if(city === ''){
        return
    }

    // fetching with the API
    const fetchWeatherData = async () => {
       const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIkey}`)
       const data = await response.json()
        console.log(data)

        // if there's no data it will show the not-found class with any other items
       if(data.cod === '404'){
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error.style.display = 'block'
            error.classList.add('fadeIn')
            return 
       }

       error.style.display = 'none'
       error.classList.remove('fadeIn')

       const image = document.querySelector('.weather-box img')
       const temperature = document.querySelector('.weather-box .temperature')
       const description = document.querySelector('.weather-box .description')
       const humidity = document.querySelector('.weather-details .humidity span')
       const wind = document.querySelector('.weather-details .wind span')
       
       
       switch(data.weather[0].main){
        case 'clear':
            image.src = 'images/clear.png'
            break
        case 'cloud':
            image.src = 'images/cloud.png'
            break
        case 'mist':
            image.src = 'images/mist.png'
            break
        case 'rain':
            image.src = 'images/rain.png'
            break
        case 'snow':
            image.src = 'images/snow.png'
            break
        default:
            image.src = ''
       }

        //sets propperties to the html with data that came from the API
        // and does the animation   
       temperature.innerHTML = `${parseInt(data.main.temp)}<span>ºC</span>`
       description.innerHTML = `${data.weather[0].description}`
       humidity.innerHTML = `${data.main.humidity}%`
       wind.innerHTML = `${parseInt(data.wind.speed)}km/h`

       weatherBox.style.display = ''
       weatherDetails.style.display = ''
       weatherBox.classList.add('fadeIn')
       weatherDetails.classList.add('fadeIn')
       container.style.height = '590px'
    }

fetchWeatherData()

})

