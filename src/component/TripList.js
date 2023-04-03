//What is a Promise?
import {useCallback, useEffect, useState} from "react";
import './TripList.css'

export default function TripList() {
    const [trips, setTrips] = useState([])
    const [url, setUrl] = useState("http://localhost:3001/trips")

    const fetchTrips_alternative = () => {
        fetch(url)
            .then(response => response.json())
            .then(json => setTrips(json))
    }


    const fetchTrips = useCallback(async () => {
        const response = await fetch(url);  // fetches data from network
        const json = await response.json(); // save fetched data into a json object
        setTrips(json)                      // declare ur initial empty Array Object -> with the fetched json object
    },[url])

    useEffect(() => {
        fetchTrips()
    }, [fetchTrips])

    console.log(trips)

    return (
        <div className={"trip-list"}>
            <h2>Trip List</h2>
            <ul>
                {trips.map((trip) => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>
            <div className={"filters"}>
                <button onClick={() => setUrl("http://localhost:3001/trips?loc=europe")}>
                    European Trips
                </button>
                <button onClick={() => setUrl("http://localhost:3001/trips")}>
                    All Trips
                </button>
            </div>
        </div>
    )
}