console.log("Weather function invoked");
async function getWeather() {
    var key = 'a8cb32ad6930f1fb54ab6bf62c5496c9';
    var city = document.getElementById("city").value;
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="
    url = url.concat(city).concat("&appid=").concat(key).concat('&units=metric');
    let result = await fetch(url);
    let obj = await result.json();
    var res = document.getElementById("result");
    document.getElementById("table").innerHTML = '<table id = "table"><tr><td><canvas id = "myChart" width = "400" height = "400"></canvas></td></tr></table>';
    var ctx = document.getElementById('myChart').getContext('2d');
    if (obj.cod == "404") {
        res.innerHTML = "<br>City not found";
        document.getElementById("table").innerHTML = "";
        document.getElementById("time").innerHTML = "";
    } else if (obj.cod == "400") {
        res.innerHTML = "<br>Enter a city";
        document.getElementById("table").innerHTML = "";
        document.getElementById("time").innerHTML = "";
    } else {
        var country = obj.city.country;
        label = [];
        data = [];
        var time = obj.list[2].dt_txt.split(" ")[1];
        res.innerHTML = '<p id = "country">' + 'Country name: ' + country + '</p>' + '<p id = "result">Max Temp is: ' + obj.list[2].main.temp_max + '<sup> o</sup>C<br>Min Temp is: ' + obj.list[2].main.temp_min + '<sup> o</sup>C</p>';
        document.getElementById("time").innerHTML = '<p id = "time"> Temperature as of time: ' + time + '</p>'
        for (i = 0; i < 40; i += 8) {
            var date = obj.list[i].dt_txt.split(" ");
            label.push(date[0]);
            data.push(obj.list[i].main.temp);
        }
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label: 'Temperature',
                    data: data,
                    backgroundColor: [
                        'grey', 'grey', 'grey', 'grey', 'grey'
                    ],
                    borderColor: [
                        'black', 'black', 'black', 'black', 'black'
                    ]
                }]
            },
        });
    }
}