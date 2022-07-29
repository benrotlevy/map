const fs = require("fs");
const csv = require("fast-csv");
const express = require("express");
const cors = require("cors");

const data = [];
let relevantData = [];

fs.createReadStream("./listing_data_houston.csv") // copy relative path to csv file you want to read
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => data.push(row))
    .on("end", () => arrange(data));

const arrange = (data) => {
    const relevant = data.map((property) => {
        return {
            lat: property.Latitude,
            lng: property.Longitude,
        };
    });
    relevantData = relevant;
};

const app = express();

const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
    try {
        console.log(relevantData.length);
        res.send(relevantData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log("SERVER IS UP AND RUNNING ON PORT " + PORT);
});
