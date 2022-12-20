import { useMutation, QueryClient } from "@tanstack/react-query";
import { OG_API_KEY } from "@env";

export const queryClient = new QueryClient();

export const usePanVerifyApi = ({ data, url }) => {
  const mutation = useMutation(
    ["PostPANOther", { data, url }],
    async () => {
      console.log("data from React Query", data);
      return await fetch(url, {
        method: "POST",
        headers: {
          "X-Auth-Type": "API-Key",
          "X-API-Key": OG_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          return error;
        });
    },
    {
      onSettled: () => {
        queryClient.refetchQueries();
      },
    }
  );
  return mutation;
};
