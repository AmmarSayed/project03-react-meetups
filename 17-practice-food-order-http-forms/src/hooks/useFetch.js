import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [meals, setMeals] = useState([]);

  const fetchData = useCallback(async (url) => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Cannot access URL");
      }
      const data = await res.json();

      const newData = Object.entries(data).map(([key, value]) => {
        return { id: key, ...value };
      });
      setMeals(newData);
      setIsLoading(false);
    } catch (error) {
      setHttpError(error.message);
    }
  }, []);

  return { meals, fetchData, isLoading, httpError };
};

export default useFetch;
