import { useState, useEffect, useCallback } from "react";

export function useLocalState(key, initial) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  const updateValue = useCallback((newValue) => {
    if (typeof newValue === "function") {
      newValue = newValue(value);
    }

    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  });

  return [value, updateValue];
}
