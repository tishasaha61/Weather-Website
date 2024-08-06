document.getElementById('btn').addEventListener('click', function() {
    var cityName = document.getElementById('search-box').value.trim();
    if (cityName !== '') {
        fetchWeather(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeather(cityName) {
    var apiKey = 'eb0cef4be31118db75d367ad6cc7c019';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                createWeatherCard(data);
            } else { 
                alert('City not found. Please enter a valid city name.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function createWeatherCard(weatherData) {
    var weatherCardsContainer = document.getElementById('weather-cards');
    var card = document.createElement('div');
    card.classList.add('weather-card');

    // Determine background color based on weather
    var weatherCondition = weatherData.weather[0].main.toLowerCase();
    var backgroundColor;
    switch (weatherCondition) {
        case 'clear':
            backgroundColor = '#fdd835'; // sunny
            break;
        case 'clouds':
            backgroundColor = '#90a4ae'; // cloudy
            break;
        case 'rain':
            backgroundColor = '#64b5f6'; // rainy
            break;
        case 'smoke':
            backgroundColor = '#bdbdbd'; // smoke
            break;
        case 'haze':
            backgroundColor = '#cfd8dc'; // haze
            break;
        default:
            backgroundColor = '#ffffff'; // default color
    }
    card.style.backgroundColor = backgroundColor;

    // Set image based on weather
    var imageSrc;
    switch (weatherCondition) {
        case 'clear':
            imageSrc = 'https://weather-app-delta-nine-67.vercel.app/Assets/Clear.png'; // sunny
            break;
        case 'clouds':
            imageSrc = 'https://weather-app-delta-nine-67.vercel.app/Assets/Smoke.png'; // cloudy
            break;
        case 'rain':
            imageSrc = 'https://img.freepik.com/premium-vector/happy-rainy-weather-cartoon_543090-883.jpg'; // rainy
            break;
        case 'smoke':
            imageSrc = 'https://weather-app-delta-nine-67.vercel.app/Assets/Smoke.png'; // smoke
            break;
        case 'haze':
            imageSrc = 'https://weather-app-delta-nine-67.vercel.app/Assets/Haze.png'; // haze
            break;
        default:
            imageSrc = 'https://example.com/default.png'; // default image
    }

    card.innerHTML = `
        <img src="${imageSrc}" alt="${weatherCondition}" class="weather-image">
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C</p>
        <p>Weather: ${weatherData.weather[0].main}</p>
    `;
    weatherCardsContainer.appendChild(card);
}