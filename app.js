const express = require("express");  //express Framework
const app = express();  // App to create server
const https = require("https");  // used to access API
const bodyParser = require("body-parser");  // used to get input from web pages

app.use(bodyParser.urlencoded({extended : true}));  // compulsory code to use body parser.

app.get("/",function(req,res){    // Only one send() is allowed for one get() Function but we can use multiple write() *
        res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

    let query = req.body.cityName;
    let apiKey = "623e6edfb31e8d312af1fbf94d0b2999";
    let unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){      //Convert Hexa-Decimal data into JS Objects to
            const weatherData = JSON.parse(data);   // easily fetch the data in terms of values.
            console.log(weatherData);           // Display whole data HERE
            
            // let object = {
            //     Name : "Piyush",
            //     Food : "Pizza",
            //     Hobbie : "Code"
            // }

            // let compressOBJ = JSON.stringify(object);   //  compress the size of Data.
            // let originalOBJ = JSON.parse(compressOBJ);  //Again get back the original data in JS Object form.
            // console.log(compressOBJ);
            // console.log(originalOBJ);

            let temp = weatherData.main.temp;
            let description = weatherData.weather[0].description;
            let icon = weatherData.weather[0].icon;
            let imageURL = "http://openweathermap.org/img/wn/"+icon+"@4x.png";
            res.write("<h1>The temperature in " +query+ " is "+temp+" degrees Celcius</h1>");
            res.write("<h3>The Weather is currently "+description+"</h3>");
            res.write("<img src="+imageURL+" >");
            res.send();
        })
    })
});




app.listen(3000,function(){
    console.log("Server is running at port 3000");
})