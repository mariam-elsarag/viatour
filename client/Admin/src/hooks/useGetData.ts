import { useEffect, useState } from "react";
import { handleError } from "../common/utils/handleError";
import axiosInstance from "../service/axiosInstance";

function useGetData<T = any>(endpoint: string, defaultQuery?: object = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [query, setQuery] = useState(defaultQuery);

  const getData = async () => {
    try {
      setLoading(true);
      console.log(endpoint, "en");
      const response = await axiosInstance.get(endpoint, {
        params: { ...query },
      });
      if (response.status === 200) {
        setData(response.data ?? []);
      }
    } catch (err) {
      console.log(err, "erro");
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, query]);

  return { data, setData, loading, setLoading, query, setQuery };
}

export default useGetData;
