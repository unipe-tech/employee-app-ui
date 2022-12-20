import { useMutation, QueryClient } from "react-query";
import { OG_API_KEY } from "@env";

export const queryClient = new QueryClient();

export const usePanVerifyApi = ({ data, url }) => {
  const mutation = useMutation(
    // ["PostPAN", { data, url }],
    ({ data, url }) => {
      console.log("data from React Query", data);
      return fetch(url, {
        method: "POST",
        headers: {
          "X-Auth-Type": "API-Key",
          "X-API-Key": OG_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // .then((response) => {
      //   console.log("PAN Response React Query: ", response);
      //   response.json();
      // })
      // .catch((error) => {
      //   return error;
      // });
    }
    // {
    //   onSettled: () => {
    //     queryClient.refetchQueries();
    //   },
    // }
  );
  return mutation;
};
