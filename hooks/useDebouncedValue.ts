import { useEffect, useState } from "react";

const useDebouncedValued = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

export default useDebouncedValued;
