import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { OG_API_KEY } from "@env";
import { KYC_PAN_VERIFY_API_URL } from "../services/constants";
import axios from "axios";

export const queryClient = new QueryClient();

export const UsePOSTVerify = ({ data, url }) => {
  const { status, ...query } = useQuery(
    ["PostPAN", { data, url }],
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
    }
  );
  return { status, ...query };
};

export const myPostCall = ({ data, url }) => {
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
      // onSuccess: (data, variables) => {
      //   // queryClient.invalidateQueries("PostPAN");
      // },
      onSettled: () => {
        queryClient.refetchQueries();
      },
    }
  );
  return mutation;
};

const postCall = async ({ data, url }) => {
  return await axios(url, {
    method: "POST",
    headers: {
      "X-Auth-Type": "API-Key",
      "X-API-Key": OG_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("backe response: ", response);
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const UseAddData = () => {
  return useMutation(async ({ data, url }) => {
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
        console.log("backe response: ", response);
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  });
};
