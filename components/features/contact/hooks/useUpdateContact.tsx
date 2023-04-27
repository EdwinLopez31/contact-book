import getData from "@/utils/getData";
import putData from "@/utils/putData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Contact } from "@prisma/client";
import { baseURL } from "@/globals";
const useUpdateContact = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess, reset, mutate } = useMutation({
    mutationFn: (updatedContactInformation: Partial<Contact>) => {
      return putData(
        `${baseURL}/api/contacts/${updatedContactInformation?.id}`,
        updatedContactInformation,
        {}
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
  return { data, isLoading, isError, isSuccess, reset, mutate };
};

export default useUpdateContact;
