import { useMutation, useQuery } from "@tanstack/react-query";
import { SMS_API_URL } from "../../services/constants";
import { getBackendData } from "../../services/employees/employeeServices";
import { store } from "../../store/store";

export const updateSms = () => {
  const mutation = useMutation({
    mutationFn: async ({ newSMSArray, parsedSmsList, count }) => {
      return await fetch(SMS_API_URL, {
        method: "POST",
        body: JSON.stringify({
          texts: JSON.stringify(newSMSArray),
          unipeEmployeeId: store.getState().auth.unipeEmployeeId,
          lastReceivedDate: parsedSmsList[0].date,
          count: count,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
  return mutation;
};

export const getSms = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getSms"],
    queryFn: async () => {
      return fetch(`${SMS_API_URL}?id=${unipeEmployeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    config: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchInterval: 1000 * 60 * 60 * 24,
    },
  });
  return response;
};
