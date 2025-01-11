import { useState, useEffect } from "react";


export default function useDebounce (value, delay) {

    let [delayedValue, setDelayedValue] = useState(value);
    
    useEffect(() => {
        let timer = setTimeout(() => {
            setDelayedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return delayedValue
}