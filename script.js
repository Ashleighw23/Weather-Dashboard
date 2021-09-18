var APIKey = "2942d71260b09ea307417084923e36cb";

document.querySelector("#weather-form").addEventListener("submit", function(e) {
    e.preventDefault();
    // capture the user input
    var cityName = document.querySelector("#search").value;
    // find city name
    getCurrent(cityName);
});

var getCurrent = function(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`

    fetch(url).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);

        var template = `
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
            <div class="card-header">${data.name}</div>
            <div class="card-body">
                <p class="card-text">Temperature: ${data.main.temp}F</p>
                <p class="card-text">Humidity: ${data.main.humidity}%</p>
                <p class="card-text">Wind Speed: ${data.wind.speed}mph</p>
            </div>
        </div>
        `;

        document.querySelector("#current").innerHTML = template;
    });
}

