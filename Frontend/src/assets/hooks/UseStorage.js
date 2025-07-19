import { useState } from "react";
export default function UseStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key); //legge dal localStorage
    return saved ? JSON.parse(saved) : initialValue; //se esiste fa il parse, se no restituisce l'initialValue
  });

//funzione che aggiorna sia lo state di React, sia il localStorage con il nuovo valore.
  function setStoredValue(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, setStoredValue];
}