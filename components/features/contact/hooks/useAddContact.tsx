import postData from "@/utils/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Contact } from "@prisma/client";
import { baseURL } from "@/globals";

const useAddContact = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess, reset, mutate } = useMutation({
    mutationFn: (updatedContactInformation: Partial<Contact>) => {
      return postData(`${baseURL}/api/contacts`, updatedContactInformation, {});
    },
    onSettled: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
  return { data, isLoading, isError, isSuccess, reset, mutate };
};

export default useAddContact;
