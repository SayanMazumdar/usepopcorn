import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
    const [value, setValue] = useState(function () {
        const storedMovie = localStorage.getItem(key);
        return storedMovie ? JSON.parse(storedMovie) : [];
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue]
}