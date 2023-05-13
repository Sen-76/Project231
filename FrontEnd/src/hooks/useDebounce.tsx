import { useState, useEffect } from "react";
interface IDebounceProps {
    value: any;
    delay: number;
}
function useDebounce({value, delay} : IDebounceProps) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler);
    }, [value])

    return debounceValue;
}

export default useDebounce;