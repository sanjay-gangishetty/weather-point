const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", function (req, res) {
  const areaname = req.body.nameOfTheArea;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    areaname +
    "&appid=464de5e0d229b773f5a0fa44e7173b24&units=metric";

  https.get(url, function (response) {
    if (response.statusCode === 200) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const countryName = weatherData.sys.country;
        const locationName = weatherData.name;
        const weather = weatherData.weather[0].main;
        const windSpeed = weatherData.wind.speed;

        res.render("weather-report", {
          temperature: temperature,
          countryName: countryName,
          locationName: locationName,
          weather: weather,
          windSpeed: windSpeed,
        });
      });
    } else {
      res.send("<h1>An Error Occured ! </h1>");
    }
  });
});

app.listen(process.env.PORT, function () {
  console.log("Server is up and Running");
});
