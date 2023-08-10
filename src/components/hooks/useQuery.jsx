"use client";
import { useState, useEffect } from "react";
import { getData } from "../../lib/helpers/getData";
// Custom Hook to handle polling
export default function useQuery(query, variables, pollInterval) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  useEffect(() => {
    let timerId;
    const fetchData = async () => {
      try {
        const data = await getData({ query, variables });
        setState({ loading: false, error: null, data });
      } catch (error) {
        setState({ loading: false, error, data: null });
      }
    };

    fetchData();

    if (pollInterval > 0) {
      timerId = setInterval(fetchData, pollInterval);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [query, variables, pollInterval]);
  return state;
}
