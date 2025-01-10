import { useEffect, useState } from "react";

const usePersist = () => {
  const [persist, setPersist] = useState(() => {
    const storedValue = localStorage.getItem("persist");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
