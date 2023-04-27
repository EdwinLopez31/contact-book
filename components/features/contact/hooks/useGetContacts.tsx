import { useQuery } from "@tanstack/react-query";
import getData from "@/utils/getData";
import { baseURL } from "@/globals";

export const getContacts = async ({ ...params }) => {
  const data = await getData(`${baseURL}/api/contacts`, {});
  return data;
};

const useGetContacts = (search = "", initialData: {}) => {
  const {
    isLoading,
    isError,
    data,
    error,
    refetch,
    isPreviousData,
    status,
    fetchStatus,
  } = useQuery(
    ["contacts"],
    () =>
      getContacts({
        initialData: initialData ? initialData : null,
      }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isPreviousData,
    status,
    fetchStatus,
  };
};

export default useGetContacts;
