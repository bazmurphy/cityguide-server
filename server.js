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

app.get("/", function (req, res) {
    // console.log("GET / route");
    res.send("This is the Mini Guide API");
})

// app.get("/favicon.ico", function (req, res) {
//     request.params console.log :
//     keeps saying "ReferenceError: favicon is not defined"
//     why do i need to do this???
// })

const workOutCity = (city) => {
    if (city === "stratford") {
        return stratford;
    } else if (city === "harrow") {
        return harrow;
    } else if (city === "heathrow") {
        return heathrow;
    }
};
// ^i don't want to use these functions, i want something more dynamic and contained within the block

const workOutCategory = (city, category) => {
    if (category === "pharmacies") {
        return city.pharmacies;
    } else if (category === "colleges") {
        return city.colleges;
    } else if (category === "hospitals") {
        return city.hospitals;
    } else if (category === "doctors") {
        return city.doctors;
    }
}
// ^i don't want to use these functions, i want something more dynamic and contained within the block

app.get("/:city", function (req, res) {
    // console.log("GET /:city route");
    console.log(req.params.city);
    res.send(workOutCity(req.params.city));
})

// app.get("/:city/pharmacies", function (req, res) {
//     // console.log("GET /:city/pharmacies route");
//     // console.log(req.params.city);
//     res.send(workOutCity(req.params.city).pharmacies);
// })

// app.get("/:city/colleges", function (req, res) {
//     // console.log("GET /:city/colleges route");
//     // console.log(req.params.city);
//     res.send(workOutCity(req.params.city).colleges);
// })

// app.get("/:city/hospitals", function (req, res) {
//     // console.log("GET /:city/hospitals route");
//     // console.log(req.params.city);
//     res.send(workOutCity(req.params.city).hospitals);
// })

// app.get("/:city/doctors", function (req, res) {
//     // console.log("GET /:city/doctors route");
//     // console.log(req.params.city);
//     res.send(workOutCity(req.params.city).doctors);
// })

app.get("/:city/:category", function (req, res) {

    console.log(req.params);
    // { city: 'stratford', category: 'hospitals' }
    console.log(req.params.city);
    // stratford
    console.log(req.params.category);
    // hospitals

    const city = req.params.city;
    const category = req.params.category;
    // The second part works because Bracket Notation allows strings..
    // But the first part doesn't work because its just a bare string
    // res.send(city[category]);

    // using EVAL() (everyone online says this is dangerous to use?)
    // const city = eval(req.params.city)
    // console.log(city);
    // const category = eval(req.params.category);
    // console.log(category)
    res.send(city[category]);
    
    // res.send(workOutCategory(workOutCity(req.params.city), req.params.category));
    // ^ this is works, but is ridiculous, there has to be a better way to do this
})

const listener = app.listen(process.env.PORT || PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});