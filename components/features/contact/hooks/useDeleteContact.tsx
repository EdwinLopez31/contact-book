import deleteData from "@/utils/deleteData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Contact } from "@prisma/client";
import { baseURL } from "@/globals";

const useDeleteContact = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess, reset, mutate } = useMutation({
    mutationFn: (id: Pick<Contact, "id">) => {
      return deleteData(`${baseURL}/api/contacts/${id.id}`, {});
    },
    onSettled: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
  return { data, isLoading, isError, isSuccess, reset, mutate };
};

export default useDeleteContact;
