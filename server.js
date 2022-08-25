const express = require("express");
const app = express();

const PORT = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

const stratford = require("./data/Stratford.json");
const harrow = require("./data/Harrow.json");
const heathrow = require("./data/Heathrow.json");

const cities = {stratford, harrow, heathrow}
// ^thank you sam for giving me this idea
// create a wrapper object so that the req.params "strings" can be used with bracket notation

app.get("/", function (req, res) {
    // console.log("GET / route");
    res.sendFile(__dirname + '/index.html');
})

// app.get("/favicon.ico", function (req, res) {
//     request.params console.log :
//     keeps saying "ReferenceError: favicon is not defined"
//     why do i need to do this? because the page is making a request for a favicon?
// })

// const workOutCity = (city) => {
//     if (city === "stratford") {
//         return stratford;
//     } else if (city === "harrow") {
//         return harrow;
//     } else if (city === "heathrow") {
//         return heathrow;
//     }
// };

// const workOutCategory = (city, category) => {
//     if (category === "pharmacies") {
//         return city.pharmacies;
//     } else if (category === "colleges") {
//         return city.colleges;
//     } else if (category === "hospitals") {
//         return city.hospitals;
//     } else if (category === "doctors") {
//         return city.doctors;
//     }
// }
// ^i don't want to use these functions, i want something more dynamic and contained within the block

app.get("/:city", function (req, res) {
    // console.log("GET /:city route");
    // console.log(req.params.city);

    // res.send(workOutCity(req.params.city));
    // ^ this is works, but is ridiculous, there has to be a better way to do this

    res.send(cities[req.params.city]);
})

app.get("/:city/:category", function (req, res) {
    // console.log("GET /:city/:category route");
    // console.log(req.params);
    // { city: 'stratford', category: 'pharmacies' }
    
    // res.send(workOutCategory(workOutCity(req.params.city), req.params.category));
    // ^ this is works, but is ridiculous, there has to be a better way to do this

    res.send(cities[req.params.city][req.params.category]);
    // ^thank you sam for giving me this idea, now i can use the string inside bracket notation for "req.params.city"
})

const listener = app.listen(process.env.PORT || PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});