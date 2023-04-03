import './TripList.css'
import {useState} from "react";
import {useFetch} from "../hooks/useFetch";

export default function TripList() {
    const [url, setUrl] = useState("http://localhost:3001/trips")
    const {data} = useFetch(url)
    return (
        <div className={"trip-list"}>
            <h2>Trip List</h2>
            <ul>
                {data && data.map((trip) => (
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