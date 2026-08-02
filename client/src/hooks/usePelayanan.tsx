import { useEffect, useState } from "react";
import type { PelayananDetail } from "../types/Pelayanan.d.ts";

const usePelayanan = (id: number) => {
  const [data, setData] = useState<PelayananDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = () => setTrigger((prev) => prev + 1);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    setIsError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${globalThis.location.hostname}:8000/pelayanan/${id}`,
          { signal: abortController.signal, cache: "no-cache" },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseJson: PelayananDetail = await response.json();
        setData(responseJson);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setIsError(
          new Error(
            `Encountered an error when fetching data from the database. Please ensure your connection is stable.\n(${err}).`,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [id, trigger]);

  return { data, isLoading, isError, refetch };
};

export default usePelayanan;
