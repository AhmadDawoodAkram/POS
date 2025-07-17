import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceValue, setDebounce] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
