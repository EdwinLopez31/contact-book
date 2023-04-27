import { useQuery } from "@tanstack/react-query";
import getData from "@/utils/getData";

export const getContacts = async ({ ...params }) => {
  const data = await getData(`${process.env.NEXT_PUBLIC_URL}/api/contacts`, {
    ...params,
  });
  return data;
};

const useGetContacts = (search = "", initialData = [{}]) => {
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
