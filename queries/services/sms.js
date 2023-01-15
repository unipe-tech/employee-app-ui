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
          employeeId: store.getState().auth.id,
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
      return getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "pan",
        token: token,
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
