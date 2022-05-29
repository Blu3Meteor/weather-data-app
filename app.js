const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "be8cd86f660a3d353320b80c5da9e87a";
  const units =  "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const iconID = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";

      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
      res.write("<h3>Description: " + weatherDesc + "</h3>");
      res.write("<img src=" + imgURL + " alt='weather image'>")
      res.send()
    });
  });
})




app.listen(8080, function() {
  console.log("Server is listening on port 8080");
});
