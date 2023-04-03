import {useState, useEffect} from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {                                                                                               // Whatever component uses this hook, this useEffect will run
        const fetchData = async () => {                                                                                     // Instead of creating this const outside of the scope, we create it inside the useEffect, so we dont have to pass the function to the dependency array
            const response = await fetch(url);
            const json = await response.json();

            setData(json)
        }
        fetchData()
    },[url])

    return {data}
}