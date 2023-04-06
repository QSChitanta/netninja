import './TripList.css'
import {useState} from "react";
import {useFetch} from "../hooks/useFetch";
import {ALL_TRIPS_URL, EUROPE_TRIPS_URL, LOCALHOST_URL} from "../helper/Constants";

//          wrap the object in a state hook, so when ur useEffect ur custom hook
//          re scans the application, it looks at the state and not at the memory
//          which always is going to be different (u can use useCallback for that aswell?)
//          -> do the same with Objects or other none primitive types

export default function TripList() {
    const [url, setUrl] = useState(LOCALHOST_URL)
    const {data: trips, isPending, error} = useFetch(url,{type: 'GET'})

    const loadingMessage = () => {return <div>Loading trips...</div>;}
    const errorResponse = () => {return <div>{error}</div>;}

    return (
        <div className={"trip-list"}>
            <h2>Trip List</h2>
            {isPending &&
                loadingMessage()}
            {error &&
                errorResponse()}
            <ul>
                {trips && trips.map((trip) => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>
            <div className={"filters"}>
                <button onClick={() => setUrl(EUROPE_TRIPS_URL)}>
                    European Trips
                </button>
                <button onClick={() => setUrl(ALL_TRIPS_URL)}>
                    All Trips
                </button>
            </div>
        </div>
    )
}