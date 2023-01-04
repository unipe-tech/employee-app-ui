import { QueryClient, useMutation } from "@tanstack/react-query";
import { putBackendData } from "../../services/employees/employeeServices";

export const queryClient = new QueryClient();

export const updateOffer = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return putBackendData({
        data: data,
        xpath: "ewa/offer",
        token: token,
      });
    },
  });
  return mutation;
};
