import { useEffect, useState } from "react";
import type { ApbdesDetail } from "../types/Apbdes.d.ts";
import { serverApi } from "../helpers/serverApi.ts";

const useApbdes = (tahun: number) => {
  const [data, setData] = useState<ApbdesDetail | null>(null);
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
          serverApi.get.apbdes.one(tahun),
          { signal: abortController.signal, cache: "no-cache" },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseJson: ApbdesDetail = await response.json();
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
  }, [tahun, trigger]);

  return { data, isLoading, isError, refetch };
};

export default useApbdes;
