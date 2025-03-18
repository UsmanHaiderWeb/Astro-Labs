import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useSearchParamsObject = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(search);
    const obj = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [search]);
};

export default useSearchParamsObject;