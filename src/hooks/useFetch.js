import {useState, useEffect, useRef} from "react";

export const useFetch = (url, api_options) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const isMounted = useRef(true);

    // use useRef to wrap an object/array argument, which is a useEffect dependency
    // if the application rescans, the ref values are not seen as new or different
    const options = useRef(api_options).current

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)
            try {
                const response = await fetch(url, {
                    signal: controller.signal
                });
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const json = await response.json();

                if (isMounted){
                setIsPending(false)
                setData(json)
                setError(null)

                }
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("The fetch was aborted")
                } else {
                    setIsPending(false)
                    setError("Could not fetch the data")
                    console.error(err.message)
                }
            }
        }
        fetchData()

        return () => {
            controller.abort()
        }
    }, [url, options])

    return {data, isPending, error}
}