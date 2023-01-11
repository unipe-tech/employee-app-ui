import { useMutation } from "@tanstack/react-query";
import { fcmPush } from "../../helpers/BackendPush";

export const updateNotification = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return fcmPush({
        data: data,
        token: token,
      });
    },
  });
  return mutation;
};
