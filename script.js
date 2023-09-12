document.getElementById('getWeatherButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=cae79f3d4aa0b5abfcbdc6fe9ebd4c29')
        .then(response => response.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            return fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&lang=sp&units=metric&appid=cae79f3d4aa0b5abfcbdc6fe9ebd4c29')
                .then(response => response.json())
                .then(data => {
                    let weatherInfo = document.getElementById('weatherInfo');
                    weatherInfo.innerHTML = '<br>' + 'Temperatura: ' + data.main.temp + ' °C' +
                                            '<br>Descripción del clima: ' + data.weather[0].description + '<br>Humedad: ' + data.main.humidity + '%' +
                                            '<br>Velocidad del viento: ' + data.wind.speed + ' m/s';     
        }).catch(error => {
            console.error('Error:', error);
            let weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = 'Hubo un error al obtener el pronóstico del tiempo.'
        })
        .catch(error => {
            console.error('Error:', error);
            let weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = 'Hubo un error al obtener la ubicación.';
        });
    });
});