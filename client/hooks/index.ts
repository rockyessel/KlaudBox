import React from 'react';

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = React.useState(fallbackValue);
  React.useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
