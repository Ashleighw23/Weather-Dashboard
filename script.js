var APIKey = "2942d71260b09ea307417084923e36cb";

document.querySelector("#weather-form").addEventListener("submit", function(e) {
    e.preventDefault();
    // capture the user input
    var cityName = document.querySelector("#search").value;
    // find city name
    getCurrent(cityName);
    //forecast
    getForecast(cityName);
});

var getForecast = function(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`

    fetch(url).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);

        var filteredData = data.list.filter((listItem) => listItem.dt_txt.includes("12:00:00"));

        var template = "";
        
        filteredData.forEach((datum) => {
            template +=`
                <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                    <img src="http://openweathermap.org/img/wn/${datum.weather[0].icon}.png"/>
                    <div class="card-header">${datum.dt_txt}</div>
                    <div class="card-body">
                        <p class="card-text">Temperature: ${datum.main.temp}F</p>
                        <p class="card-text">Humidity: ${datum.main.humidity}%</p>
                        <p class="card-text">Wind Speed: ${datum.wind.speed}mph</p>
                    </div>
                </div>
            `;
        });

        document.querySelector("#forecast").innerHTML = template;
        getUV(data.city.coord.lat, data.city.coord.lon);
    });
}

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
                    <p class="card-text uvi">UV Index: ${data.uvi}</p>
                </div>
            </div>
        `;

        document.querySelector("#current").innerHTML = template;
    });

}

var heroShinker = function () {
    var hero = $(".hero-nav"),
        heroHeight = $(".hero-nav").outerHeight(true);
    $(hero).parent().css("padding-top", heroHeight);
    $(window).scroll(function () {
        var scrollOffset = $(window).scrollTop();
        if (scrollOffset < heroHeight) {
            $(hero).css("height", heroHeight - scrollOffset);
        }
        if (scrollOffset > heroHeight - 215) {
            hero.addClass("fixme");
        } else {
            hero.removeClass("fixme");
        }
    });
};

var getUV = function(lat, lon) {
    var  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${APIKey}&units=imperial`;

    fetch(url).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        document.querySelector(".uvi").textContent = data.current.uvi;
    });
};

