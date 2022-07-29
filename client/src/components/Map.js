import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
    width: "95vw",
    height: "80vh",
};

const center = {
    lat: 29.7604,
    lng: -95.358421,
};

// const position = {
//     lat: 32.8214,
//     lng: -96.77394,
// };

const onLoad = (marker) => {
    // console.log("marker: ", marker);
};

function Map() {
    const [locationsData, setLocationsData] = useState([]);

    async function getData() {
        try {
            const { data } = await axios.get("http://localhost:5000/");
            setLocationsData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const insertMarkers = () => {
        return locationsData.map((property) => {
            return (
                <Marker
                    key={
                        Number(property.lat) +
                        Number(property.lng) +
                        Math.random()
                    }
                    // icon={{ scale: 1 }}
                    onLoad={onLoad}
                    position={{
                        lat: Number(property.lat),
                        lng: Number(property.lng),
                    }}
                />
            );
        });
    };

    return (
        <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyCYtJlvkzsDu_9zWG2DiHOFjKF-uWsTxqU">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={5}
                >
                    <>{insertMarkers()}</>
                </GoogleMap>
            </LoadScript>
            <button className="load-btn" onClick={getData}>
                Load Locations from file
            </button>
        </div>
    );
}

export default Map;
