import { useEffect, useState } from "react";
import { HydraCollectionInterface } from "../types";
import { getCategories } from "../apis";

export const useFetchCategories = (queryParams?: URLSearchParams) => {
  const [categories, setCategories] = useState<HydraCollectionInterface>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setCategories(await getCategories(queryParams));
      } catch (e) {
        setError("Error when loading categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return { categories, error, loading };
};
