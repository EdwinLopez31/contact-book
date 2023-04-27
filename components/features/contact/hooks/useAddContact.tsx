import postData from "@/utils/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Contact } from "@prisma/client";

const useAddContact = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess, reset, mutate } = useMutation({
    mutationFn: (updatedContactInformation: Partial<Contact>) => {
      return postData(
        `${process.env.NEXT_PUBLIC_URL}/api/contacts`,
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

export default useAddContact;
